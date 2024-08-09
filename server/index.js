/**
 * @fileoverview Main entry point for the backend server.
 * @module index
 */
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import wordRoutes from './routes/wordRoutes.js';
import connectToMongodb from './db/connectToMongodb.js';
import cors from 'cors';
import setupSwagger from './swagger.js';

const app = express();

/**
 * Loads environment variables from a .env file into process.env.
 */
dotenv.config();

/**
 * The port on which the server will listen.
 * @type {number}
 */
const port = process.env.PORT || 8000;

/**
 * Configures CORS to allow requests from the frontend application.
 * @type {cors.CorsOptions}
 */
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // for sending cookies
  }));

/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());

/**
 * Middleware to parse cookies in requests.
 */
app.use(cookieParser());

/**
 * Sets up Swagger for API documentation.
 * @param {express.Express} app - The Express application instance.
 */
setupSwagger(app);

/**
 * Route handlers for authentication-related API endpoints.
 * @type {express.Router}
 */
app.use('/api/auth', authRoutes);

/**
 * Route handlers for word-related API endpoints.
 * @type {express.Router}
 */
app.use('/api/words', wordRoutes);

/**
 * Starts the Express server and connects to MongoDB.
 * @param {number} port - The port number on which the server will listen.
 */
app.listen(port, () => {
    connectToMongodb();
    console.log(`Server is listening on port: ${port}`);
})