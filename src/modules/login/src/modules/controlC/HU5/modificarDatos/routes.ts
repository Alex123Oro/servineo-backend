import express from "express";
import { obtenerDatosUsuario, actualizarDatosUsuario } from "./controller.js";

const router = express.Router();

router.get("/requester/data", obtenerDatosUsuario);
router.put("/requester/update-profile", actualizarDatosUsuario);

export default router;
