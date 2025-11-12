import { Router } from 'express';
import { loginUsuario, loginGoogle } from "./auth.controller.js";

const router = Router();

router.post('/login', loginUsuario);
router.post("/google", loginGoogle);

export default router;
