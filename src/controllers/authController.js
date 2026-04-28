import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res) {
  try {
    const { email, password } = req.body;
    const newUser = await signUp(email, password);

    res.status(201).json({
      id: newUser.id,
      email: newUser.email
    });

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Internal server error",
    });
  }
}

export async function logInHandler(req, res) {
  try {
    const { email, password } = req.body;

    const accessToken = await logIn(email, password);

    res.status(200).json({ token: accessToken });

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Internal server error",
    });
  }
}