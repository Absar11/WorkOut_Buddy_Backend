const mongoose = require("mongoose");
const User = require("../models/userSchema");
const hashPassword = require("../utils/hashedPassword");

// login
const login = async (req, res) => {
  res.json({ msg: "login user" });
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
