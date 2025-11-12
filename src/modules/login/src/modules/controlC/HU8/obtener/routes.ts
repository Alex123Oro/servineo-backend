import express from "express";
import { cambiarContrasena } from "./controller.js";

const router = express.Router();

router.post("/cambiar-password/:id", cambiarContrasena);

export default router;