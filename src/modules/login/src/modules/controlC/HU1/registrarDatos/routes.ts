import { Router } from 'express';
import { manualRegister } from './controller.js';

const router = Router();

// Registro manual: POST /api/controlC/registro/manual
router.post('/manual', manualRegister);

export default router;
