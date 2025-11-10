import { Router } from "express";
import * as notificationController from './notification.controller';

const router =  Router();
router.get('/',notificationController.getAllNotification);
router.patch('/:id/leida',notificationController.markNotificationAsReadAddController);
router.get('/tipo/:notification_t ype',notificationController.getNotificationByType);
export default router; 