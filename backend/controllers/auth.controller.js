import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmailUser } from "../mailtrap/emails.js";

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
  const { body } = req.body;

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
  } catch (error) {}
};
export const login = async (req, res) => {
  res.send("login route");
};
export const logout = async (req, res) => {
  res.send("logout route");
};
