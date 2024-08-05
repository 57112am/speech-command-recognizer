import express from 'express';
import { deleteAWord, getAllDetectedWords, saveWords, updatePinStatus, updateTitle } from '../controllers/wordController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/saveWords', protectRoute, saveWords);
router.get('/getAllDetectedWords', protectRoute, getAllDetectedWords);
router.delete('/deleteAWord/:id', protectRoute, deleteAWord);
router.patch('/updatePinStatus/:id', protectRoute, updatePinStatus);
router.patch('/updateWordTitle/:id',protectRoute, updateTitle);

export default router;