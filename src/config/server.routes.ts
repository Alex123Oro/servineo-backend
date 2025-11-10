import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js'; // <-- Agregamos .js
import notificationRoutes from '../modules/notification/notification.routes.js';

const router = Router();

router.use('/api', HealthRoutes);
router.use('/api/notifications',notificationRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
