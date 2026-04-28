import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  getHabitsHandler,
  createHabitHandler,
  getHabitByIdHandler,
  updateHabitHandler,
  deleteHabitHandler,
} from "../controllers/habitController.js";

import { validateHabit } from "../middleware/habitValidators.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = Router();

router.get("/", authenticate, getHabitsHandler);

router.post(
  "/",
  authenticate,
  validateHabit,
  handleValidationErrors,
  createHabitHandler
);

router.get("/:id", authenticate, getHabitByIdHandler);

router.put(
  "/:id",
  authenticate,
  validateHabit,
  handleValidationErrors,
  updateHabitHandler
);

router.delete("/:id", authenticate, deleteHabitHandler);

export default router;