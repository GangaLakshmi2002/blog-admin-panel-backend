import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from './routes/comment.route.js';
import cors from 'cors';

dotenv.config();

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Mongodb is connected');
})
.catch((err) => {
    console.log(err)
})

const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin: process.env.API_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    credentials: true  // Allow credentials (cookies) to be sent with requests
}));

app.use(cookieParser());
app.use(express.json())

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});