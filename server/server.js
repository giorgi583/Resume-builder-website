import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// database connection 
await connectDB();

app.get('/', (req, res)=> res.send('Hello World'));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));