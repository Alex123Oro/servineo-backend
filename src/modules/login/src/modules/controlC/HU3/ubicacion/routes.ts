import { Router } from "express";
import { registrarUbicacion } from "./controller.js";
import { verifyJWT } from "../google/controller.js";

const router = Router();

router.post("/", verifyJWT, registrarUbicacion);

export default router;
