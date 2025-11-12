import { Router } from 'express';
import * as HealthController from './health.controller.js';

const router = Router();

router.get('/healthy', HealthController.getHealthStatusController);
router.get('/health/db', HealthController.getDbHealthController);

export default router;
