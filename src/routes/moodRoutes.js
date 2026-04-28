import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  getMoodsHandler,
  createMoodHandler,
  getMoodByIdHandler,
  updateMoodHandler,
  deleteMoodHandler,
} from "../controllers/moodController.js";

import { validateMood } from "../middleware/moodValidators.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = Router();

router.get("/", authenticate, getMoodsHandler);

router.post(
  "/",
  authenticate,
  validateMood,
  handleValidationErrors,
  createMoodHandler
);

router.get("/:id", authenticate, getMoodByIdHandler);

router.put(
  "/:id",
  authenticate,
  validateMood,
  handleValidationErrors,
  updateMoodHandler
);

router.delete("/:id", authenticate, deleteMoodHandler);

export default router;