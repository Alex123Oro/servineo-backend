import { Router } from 'express';
import { manualRegister } from '../../controllers/userManagement/registrarDatos.controller.js';

const router = Router();

// Ruta para el registro manual
router.post('/manual', manualRegister);

export default router;