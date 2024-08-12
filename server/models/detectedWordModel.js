import mongoose from "mongoose";

const detectedWordsSchema = new mongoose.Schema(
  {
    words: {
      type: [String],
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false, // or whatever default value you prefer
    },
    title: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const DetectedWords = mongoose.model("DetectedWords", detectedWordsSchema);

export default DetectedWords;
