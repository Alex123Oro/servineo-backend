import { Router } from "express";
import { verifyClientJWT } from "./verificar.js";
import {
  getClientProfile,
  unlinkLoginMethod,
  linkEmailPasswordMethod,
  linkGoogleMethod,
  updateClientProfile
} from "./controller.js";

const router = Router();

router.get("/profile", verifyClientJWT, getClientProfile);
router.put("/profile", verifyClientJWT, updateClientProfile);
router.patch("/profile", verifyClientJWT, updateClientProfile);
router.patch("/unlink", verifyClientJWT, unlinkLoginMethod);
router.post("/link-email-password", verifyClientJWT, linkEmailPasswordMethod);
router.post("/link-google", verifyClientJWT, linkGoogleMethod);


export default router;
