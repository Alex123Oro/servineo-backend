import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js';
import FixersRoutes from '../routes/fixers.routes.js';

const router = Router();

// Montar rutas
router.use('/api/health', HealthRoutes);
router.use('/api/fixers', FixersRoutes);

// Middleware para rutas no encontradas
router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
