import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = 5000;
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
