import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
