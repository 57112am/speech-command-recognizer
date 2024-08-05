import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  recognizedWords: [],
  detectedWords: [], // Ensure this is in the initial state
  status: "idle", // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Thunk to fetch all detected words
export const fetchAllDetectedWords = createAsyncThunk(
  "words/fetchAllDetectedWords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/words/getAllDetectedWords",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const words = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return words;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to save recognized words
export const sendRecognizedWords = createAsyncThunk(
  "words/sendRecognizedWords",
  async (words, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/words/saveWords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ words }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json(); // Return response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to delete a word
export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (wordId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/words/deleteAWord/${wordId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return wordId; // Return the ID of the deleted word
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWordPinStatus = createAsyncThunk(
  "words/updateWordPinStatus",
  async (word, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/words/updatePinStatus/${word._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPinned: !word.isPinned }),
          credentials: "include",
        }
      );
      const updatedWord = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update pin status");
      }
      return updatedWord;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    addRecognizedWord: (state, action) => {
      state.recognizedWords.push(action.payload);
    },
    clearRecognizedWords: (state) => {
      state.recognizedWords = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRecognizedWords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendRecognizedWords.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendRecognizedWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllDetectedWords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDetectedWords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detectedWords = action.payload;
      })
      .addCase(fetchAllDetectedWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted word from the detectedWords array
        state.detectedWords = state.detectedWords.filter(
          (word) => word._id !== action.payload
        );
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateWordPinStatus.fulfilled, (state, action) => {
        const index = state.detectedWords.findIndex(word => word._id === action.payload._id);
        if (index !== -1) {
          state.detectedWords[index] = action.payload;
        }
      });
  },
});

export const { addRecognizedWord, clearRecognizedWords } = wordsSlice.actions;
export default wordsSlice.reducer;
