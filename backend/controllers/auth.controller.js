import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmailUser } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All field are required");
    }

    const userAlreadyExist = await User.findOne({ email });
    console.log("userAlreadyExist", userAlreadyExist);

    if (userAlreadyExist) {
      return res.status(400).json({ success: false, message: "user already exist" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000, // expired 24hours
    });

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User creted Succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiredAt = undefined;
    await user.save();

    await sendWelcomeEmailUser(user.email, user.name);
    req.status(200).json({
      success: true,
      message: "Email verified Succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(" error ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
    //jwt
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged Succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(" error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout Succesfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    //genereate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000; // 1hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiredAt = resetTokenExpiredAt;

    await user.save();

    //send email
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(" error in forgot password ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired password reset token" });
    }

    //update password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiredAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(" error in reset password ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
