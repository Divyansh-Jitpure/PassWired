import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: 6,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const User = mongoose.model("User", UserSchema);

export default User;
