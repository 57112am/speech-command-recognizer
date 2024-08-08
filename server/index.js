import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import wordRoutes from './routes/wordRoutes.js';
import connectToMongodb from './db/connectToMongodb.js';
import cors from 'cors';
import setupSwagger from './swagger.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // for sending cookies
  }));
app.use(express.json());
app.use(cookieParser());

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/words', wordRoutes);

app.listen(port, () => {
    connectToMongodb();
    console.log(`Server is listening on port: ${port}`);
})