import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
// import authController from "../controllers/authController.js";

const router = express.Router();

// router.post("/");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email!!" }); //try message later
    }

    // Check if username already exists
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already taken!!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered successfully!!" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/refresh");

// router.post("/logout");

export default router;
