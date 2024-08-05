import User from "../models/userModel.js";
import DetectedWords from "../models/detectedWordModel.js";

export const saveWords = async (req, res) => {
  try {
    const user = req.user;
    const { words } = req.body;

    if (!user || !words || !Array.isArray(words)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Create a new DetectedWords document
    const detectedWords = new DetectedWords({
      words,
    });

    // Save the document to the database
    const savedDetectedWords = await detectedWords.save();

    // Update the user document to include the new detected words reference
    await User.findByIdAndUpdate(user._id, {
      $push: { detectedWords: savedDetectedWords._id },
    });

    // Respond with success
    res.status(200).json({ message: "Words saved successfully" });
  } catch (error) {
    console.error("Error in saveWords controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllDetectedWords = async (req, res) => {
  try {
    const userId = req.user._id;

    // const user = await User.findById(userId).populate("detectedWords").exec();
    const user = await User.findById(userId).populate({
      path: "detectedWords",
      options: { sort: { 'createdAt': -1 } } // Assuming 'createdAt' is the field indicating when a word was detected
    }).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(user.detectedWords)
    res.status(200).json(user.detectedWords);
  } catch (error) {
    console.error("Error in getAllDetectedWords controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAWord = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find and remove the word document by ID
    const wordToDelete = await DetectedWords.findById(id);

    if (!wordToDelete) {
      return res.status(404).json({ error: "Word not found" });
    }

    // Remove the reference from the user's detectedWords array
    await User.findByIdAndUpdate(user._id, {
      $pull: { detectedWords: id },
    });

    // Delete the word document
    await DetectedWords.deleteOne({ _id: wordToDelete._id });

    // Respond with success
    res.status(200).json({ message: "Word deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAWord controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePinStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPinned } = req.body;
    
    const updatedWord = await DetectedWords.findByIdAndUpdate(
        id,
        { isPinned },
        { new: true }
    );
    
    if (!updatedWord) {
        return res.status(404).json({ error: "Word not found" });
    }
    
    // console.log(updatedWord);
    res.status(200).json(updatedWord);
  } catch (error) {
    console.error("Error in updatePinStatus controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
