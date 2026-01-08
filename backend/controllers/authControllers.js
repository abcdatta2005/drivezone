import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   SIGN UP CONTROLLER
========================= */
export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    console.log(req.body); // ✅ keep this for debugging

    // 1️⃣ Validation
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save user
    await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful"
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      token
    });

  } catch (error) {
    console.error("Signin error:", error); // 🔴 IMPORTANT
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};