/**
 * @module routes/words
 */

import express from "express";
import {
  deleteAWord,
  getAllDetectedWords,
  saveWords,
  updatePinStatus,
  updateTitle,
} from "../controllers/wordController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

/**
 * @route POST /saveWords
 * @description Saves recognized words to the database.
 * @access Private
 * @middleware protectRoute
 */
router.post("/saveWords", protectRoute, saveWords);

/**
 * @route GET /getAllDetectedWords
 * @description Retrieves all detected words from the database.
 * @access Private
 * @middleware protectRoute
 */
router.get("/getAllDetectedWords", protectRoute, getAllDetectedWords);

/**
 * @route DELETE /deleteAWord/:id
 * @description Deletes a word by its ID.
 * @access Private
 * @middleware protectRoute
 * @param {string} id - The ID of the word to delete.
 */
router.delete("/deleteAWord/:id", protectRoute, deleteAWord);

/**
 * @route PATCH /updatePinStatus/:id
 * @description Updates the pin status of a word.
 * @access Private
 * @middleware protectRoute
 * @param {string} id - The ID of the word to update.
 */
router.patch("/updatePinStatus/:id", protectRoute, updatePinStatus);

/**
 * @route PATCH /updateWordTitle/:id
 * @description Updates the title of a word.
 * @access Private
 * @middleware protectRoute
 * @param {string} id - The ID of the word to update.
 */
router.patch("/updateWordTitle/:id", protectRoute, updateTitle);

export default router;
