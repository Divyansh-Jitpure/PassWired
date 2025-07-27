// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import required modules
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000; // Define server port
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for specified origin and allow credentials
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Route handlers for authentication and password management
app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);

// Default route for server root
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Connect to MongoDB using environment variable
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
