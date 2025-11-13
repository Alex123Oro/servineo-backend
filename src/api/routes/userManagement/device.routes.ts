// src/modules/controlC/HU6/device.routes.ts
import { Router } from "express";
import { registerDevice, getDevices } from "../../controllers/userManagement/device.controller";

const router = Router();

router.post("/register", registerDevice);
router.get("/:userId", getDevices);

export default router;