import User from "../models/userModel.js";
import DetectedWords from "../models/detectedWordModel.js";

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: Operations related to detected words
 */

/**
 * @swagger
 * /api/words/saveWords:
 *   post:
 *     summary: Save a list of detected words
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               words:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["example", "test", "swagger"]
 *     responses:
 *       200:
 *         description: Words saved successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/words/getAllDetectedWords:
 *   get:
 *     summary: Get all detected words for the user
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all detected words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   words:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const getAllDetectedWords = async (req, res) => {
  try {
    const userId = req.user._id;

    // const user = await User.findById(userId).populate("detectedWords").exec();
    const user = await User.findById(userId)
      .populate({
        path: "detectedWords",
        options: { sort: { createdAt: -1 } }, // Assuming 'createdAt' is the field indicating when a word was detected
      })
      .exec();

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

/**
 * @swagger
 * /api/words/deleteAWord/{id}:
 *   delete:
 *     summary: Delete a detected word by ID
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the word to delete
 *     responses:
 *       200:
 *         description: Word deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Word not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/words/updatePinStatus/{id}:
 *   patch:
 *     summary: Update the pin status of a word
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the word to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPinned:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Pin status updated successfully
 *       404:
 *         description: Word not found
 *       500:
 *         description: Internal server error
 */
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
};

/**
 * @swagger
 * /api/words/updateWordTitle/{id}:
 *   patch:
 *     summary: Update the title of a detected word
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the word to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *     responses:
 *       200:
 *         description: Title updated successfully
 *       404:
 *         description: Word not found
 *       500:
 *         description: Internal server error
 */
export const updateTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    // Find and update the word's title in the database
    const updatedWord = await DetectedWords.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!updatedWord) {
      return res.status(404).json({ message: "Word not found" });
    }
    res.json(updatedWord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
