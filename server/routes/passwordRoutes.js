import express from "express";
import verifyAccessToken from "../middleware/verifyAccessToken.js";
import Password from "../model/Password.js";
import crypto from "crypto";

const router = express.Router();

// Encryption algorithm and IV length constants
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; // For AES, this is always 16

// Function to encrypt a text using AES-256-CBC
const encrypt = (text) => {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  const iv = crypto.randomBytes(IV_LENGTH); // Generate random IV
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  // Return IV and encrypted text as hex, separated by ':'
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Function to decrypt an encrypted text using AES-256-CBC
const decrypt = (text) => {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// Route to add a new password entry
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

// Route to get all passwords for the authenticated user
router.get("/allPwds", verifyAccessToken, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });

    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to view (decrypt) a specific password by ID
router.get("/view/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const password = await Password.findOne({ _id: id, user: req.user.id });
    if (!password) {
      return res.status(404).json({ error: "Password not found" });
    }
    const decryptedPassword = decrypt(password.password);
    res.status(200).json({
      password: decryptedPassword,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/edit/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { password, username, service } = req.body;

  try {
    if (!password || !username || !service) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const pwd = await Password.findOne({ _id: id, user: req.user.id });
    if (!pwd) {
      return res.status(404).json({ error: "Password not found" });
    }

    console.log(pwd);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a password entry by ID
router.delete("/delete/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPassword = await Password.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deletedPassword) {
      return res.status(404).json({ error: "Password not found" });
    }
    res.status(200).json({ message: "Password deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
