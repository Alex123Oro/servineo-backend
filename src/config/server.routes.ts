import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js';
import AuthRoutes from '../modules/login/src/modules/auth/auth.routes.js';
// controlC routers
import RegistrarDatosRouter from '../modules/login/src/modules/controlC/HU1/registrarDatos/routes.js';
import GoogleRouter from '../modules/login/src/modules/controlC/HU3/google/routes.js';
import UbicacionRouter from '../modules/login/src/modules/controlC/HU3/ubicacion/routes.js';
import ControlCAuthRouter from '../modules/login/src/modules/controlC/HU4/auth/auth.routes.js';
import ModificarDatosRouter from '../modules/login/src/modules/controlC/HU5/modificarDatos/routes.js';
import SugerenciasRouter from '../modules/login/src/modules/controlC/HU5/sugerencias/routes.js';
import CambiarContrasenaRouter from '../modules/login/src/modules/controlC/HU8/editarContraseña/routes.js';
import ObtenerContrasenaRouter from '../modules/login/src/modules/controlC/HU8/obtener/routes.js';

const router = Router();

// Redirige la raíz a health para verificación rápida
router.get('/', (req, res) => {
  res.redirect('/api/health');
});

router.use('/api', HealthRoutes);
router.use('/api/auth', AuthRoutes);
// Montar rutas controlC bajo /api/controlC/*
router.use('/api/controlC/registro', RegistrarDatosRouter);
router.use('/api/controlC/google', GoogleRouter);
router.use('/api/controlC/ubicacion', UbicacionRouter);
router.use('/api/controlC/auth', ControlCAuthRouter);
router.use('/api/controlC/modificar-datos', ModificarDatosRouter);
router.use('/api/controlC/sugerencias', SugerenciasRouter);
router.use('/api/controlC/cambiar-contrasena', CambiarContrasenaRouter);
router.use('/api/controlC/obtener-password', ObtenerContrasenaRouter);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
