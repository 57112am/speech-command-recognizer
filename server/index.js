import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import connectToMongodb from './db/connectToMongodb.js';
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    connectToMongodb();
    console.log(`Server is listening on port: ${port}`);
})