import express from "express";
import {
  googleAuth,
  register,
  signin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/google", googleAuth);

export default router;
