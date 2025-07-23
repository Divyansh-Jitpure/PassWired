import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyAccessToken from "../middleware/verifyAccessToken.js";
// import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/user", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
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

    console.log(newUser);

    res
      .status(201)
      .json({ message: "User Registered successfully!!", id: newUser._id });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/setpin", async (req, res) => {
  try {
    const { id, pin } = req.body;

    // Validate input
    if (!pin) {
      return res.status(400).json({ error: "Pin is required" });
    }

    if (pin.length !== 4) {
      return res.status(400).json({ error: "Pin must be 4 digits long" });
    }

    const user = await User.findById(id);
    user.pin = pin;
    await user.save();

    res.status(200).json({ message: "Pin set successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to set pin" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists and make a user object
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found!!" });

    // Comparing input password and stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid Email or password!!" });

    // Generate access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //sameSite: "None" when frontend on Firebase, backend on Render)

      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized access - Refresh token missing" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    // console.log("Payload:", payload);

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
