const router = require("express").Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutController");

router.post("/", createWorkout);
router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
