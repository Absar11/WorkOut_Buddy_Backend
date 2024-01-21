const mongoose = require("mongoose");
const Workout = require("../models/workoutSchema");

const router = require("express").Router();

//add workout
const createWorkout = async (req, res) => {
  const { title, weight, reps } = req.body;

  try {
    const workout = await Workout.create({ title, weight, reps });

    res.status(200).json({
      message: "New Workout Added Succesfully",
      data: workout,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

//get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "No Such Workout" });
  }

  res.status(200).json(workout);
};

// delete workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such workout" });
  }

  try {
    const del = await Workout.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "workout deleted successfully",
    });
  } catch (error) {
    error.message;
    res.status(400).json({
      message: "No such workout exist",
    });
  }
};

//update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No such workout present");
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    res.status(200).json({
      success: true,
      message: "Workout updatade successfullt",
      workout,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "No such workout",
    });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
