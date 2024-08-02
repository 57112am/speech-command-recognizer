import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Retrieve user information from localStorage
const loadUserFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {
    _id: '',
    fullName: '',
    email: '',
    token: '',
  };
};

const initialState = {
  ...loadUserFromLocalStorage(),
  status: 'idle', // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await fetch('http://localhost:8000/api/auth/signup', { // Update with your API endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to sign up');
  }
  const data = await response.json();
  localStorage.setItem("userInfo", JSON.stringify(data));
  return data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await fetch('http://localhost:8000/api/auth/login', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to log in');
  }
  const data = await response.json();
  localStorage.setItem("userInfo", JSON.stringify(data));
  return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await fetch('http://localhost:8000/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to log out');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state._id = '';
      state.fullName = '';
      state.email = '';
      state.token = '';
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state._id = action.payload._id;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state._id = action.payload._id;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle'; // or 'succeeded', depending on your needs
        state._id = '';
        state.fullName = '';
        state.email = '';
        state.token = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;