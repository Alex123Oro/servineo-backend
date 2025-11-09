import { Router } from "express";
import * as notificationController from './notification.controller';

const router =  Router();
router.get('/',notificationController.getAllNotification);
router.get('/tipo/:notification_type',notificationController.getNotificationByType);
export default router; 