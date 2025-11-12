import { Router } from 'express';
import { loginUsuario, loginGoogle, registerUsuario } from "./auth.controller.js";

const router = Router();

// POST /api/auth/login
router.post('/login', loginUsuario);
router.post("/google", loginGoogle);
router.post('/register', registerUsuario);

export default router;
