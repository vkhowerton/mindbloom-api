import { body } from "express-validator";

export const validateMood = [
  body("mood").notEmpty().withMessage("Mood is required"),

  body("note")
    .optional(),

  body("habitId")
    .optional()
    .isInt()
    .withMessage("habitId must be an integer"),
];