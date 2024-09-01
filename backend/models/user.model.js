import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      tipe: String,
      required: true,
      unique: true,
    },
    password: {
      tipe: String,
      required: true,
    },
    name: {
      tipe: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiredAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
