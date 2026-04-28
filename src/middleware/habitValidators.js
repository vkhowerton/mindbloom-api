import { body } from "express-validator";

// Validation rules for creating/updating a habit
export const validateHabit = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("frequency")
    .isIn(["daily", "weekly", "monthly"])
    .withMessage("Frequency must be daily, weekly, or monthly"),
];