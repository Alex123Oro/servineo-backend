import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js';
// Montajes adicionales de ControlC
import GoogleRoutes from '../modules/login/src/modules/controlC/HU3/google/routes.js';
import UbicacionRoutes from '../modules/login/src/modules/controlC/HU3/ubicacion/routes.js';
import AuthRoutes from '../modules/login/src/modules/controlC/HU4/auth/auth.routes.js';
import ClienteRoutes from '../modules/login/src/modules/controlC/cliente/routes.js';
import RegistroRoutes from '../modules/login/src/modules/controlC/HU1/registrarDatos/routes.js';
// Auth general
import { googleAuth } from '../modules/login/src/modules/controlC/HU3/google/controller.js';

const router = Router();

router.use('/api', HealthRoutes);
// Rutas de ControlC
router.use('/api/controlC/google', GoogleRoutes);
router.use('/api/controlC/ubicacion', UbicacionRoutes);
router.use('/api/controlC/auth', AuthRoutes);
router.use('/api/controlC/cliente', ClienteRoutes);
router.use('/api/controlC/registro', RegistroRoutes);
// Alias común usado por el frontend para login con Google
router.post('/api/auth/google', googleAuth);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
