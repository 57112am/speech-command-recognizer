import mongoose from "mongoose";

const detectedWordsSchema = new mongoose.Schema({
    words: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

const DetectedWords = mongoose.model('DetectedWords', detectedWordsSchema);

export default DetectedWords;