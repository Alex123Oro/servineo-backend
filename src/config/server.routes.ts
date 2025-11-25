import { Router } from 'express';
<<<<<<< HEAD
import HealthRoutes from '../modules/health/health.routes.js'; // <-- Agregamos .js

const router = Router();

router.use('/api', HealthRoutes);

=======
import HealthRoutes from '../api/routes/health.routes';

import AuthRoutes from '../api/routes/userManagement/auth.routes';


const router = Router();

// Todas las rutas de health bajo /api
router.use('/api', HealthRoutes);
router.use('/api/auth', AuthRoutes);


// Manejo de rutas no encontradas
>>>>>>> 5c02cc2fd2e57075a7aed794eecb6702d5b7c2d5
router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 5c02cc2fd2e57075a7aed794eecb6702d5b7c2d5
