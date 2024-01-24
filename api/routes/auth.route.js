import express from "express";
import {
  googleAuth,
  register,
  signOut,
  signin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.get("/signout", signOut);

export default router;
