import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

import bcrypt from "bcrypt";
// Handles user signup requests
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body; // Corrected destructuring for object
  try {
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all the required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10); // Fixed typo: gensalt to genSalt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullname, email, password: hashedPassword });
    if (newUser) {
      await newUser.save(); // Save the new user before generating the token
      generateToken(newUser._id, res);
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles user login requests
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid crudential" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid crudential" });
    }

    generateToken(user._id, res);
    res.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error, message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles user logout requests
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user_.id;
    if (!profilePic) {
      return res.status(400).json({ error: "profilepic is required" });
    }
    const uploadResponse = await cloudinary.updateProfile(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error is update profile", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkauth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkauth controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
