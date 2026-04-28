import { body } from "express-validator";

// Validation rules for creating/updating a journal
export const validateJournal = [
  // Title must exist and not be empty
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  // Content must exist and not be empty
  body("content")
    .notEmpty()
    .withMessage("Content is required"),
];