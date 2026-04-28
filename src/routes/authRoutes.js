import { Router } from "express";
import { signUpHandler, logInHandler } from "../controllers/authController.js";
import { validateSignup } from "../middleware/validateSignup.js";
import { validateLogin } from "../middleware/validateLogin.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = Router();

router.post(
  "/signup",
  validateSignup,
  handleValidationErrors,
  signUpHandler
);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  logInHandler
);

export default router;