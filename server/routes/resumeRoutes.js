import express from 'express';
import { createResume, getResumeById, updateResume, deleteResume, getPublicResumeById } from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';
const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.get('/get/:id', protect, getResumeById);
resumeRouter.put('/update', upload.single('image'), protect, updateResume);
resumeRouter.delete('/delete/:id', protect, deleteResume);
resumeRouter.get('/public/:id', getPublicResumeById);

export default resumeRouter;