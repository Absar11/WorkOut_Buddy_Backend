const mongoose = require("mongoose");
const User = require("../models/userSchema");
const hashPassword = require("../utils/hashedPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User Not registered" });
    }

    const passwordCheck = await comparePassword(password, user.password);

    if (!passwordCheck) {
      res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await generateToken(user._id);

    res.status(200).json({
      message: "Login Successfull",
      payload: token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Internal Server Error Please try again or after sometime",
    });
  }
};

//signup
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User allready exist" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "New User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, signup };
