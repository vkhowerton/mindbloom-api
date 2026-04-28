import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  getJournalsHandler,
  createJournalHandler,
  getJournalByIdHandler,
  updateJournalHandler,
  deleteJournalHandler,
} from "../controllers/journalController.js";

import { validateJournal } from "../middleware/journalValidators.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = Router();

router.get("/", authenticate, getJournalsHandler);

router.post(
  "/",
  authenticate,
  validateJournal,
  handleValidationErrors,
  createJournalHandler
);

router.get("/:id", authenticate, getJournalByIdHandler);

router.put(
  "/:id",
  authenticate,
  validateJournal,
  handleValidationErrors,
  updateJournalHandler
);

router.delete("/:id", authenticate, deleteJournalHandler);

export default router;