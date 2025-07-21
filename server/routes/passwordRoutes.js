import express from "express";
import verifyAccessToken from "../middleware/verifyAccessToken.js";
import Password from "../model/Password.js";
import crypto from "crypto";

const router = express.Router();

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (text) => {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

router.post("/add", verifyAccessToken, async (req, res) => {
  const { password, username, service } = req.body;
  if (!password || !username || !service) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const encryptedPassword = encrypt(password);

  const newPassword = new Password({
    user: req.user.id,
    password: encryptedPassword,
    username,
    service,
  });

  try {
    await newPassword.save();
    res.status(201).json({ message: "Password added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
