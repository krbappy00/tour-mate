import express from "express";
import { registerUser, loginUser } from "./user.controller";
import authentication from "../../middleware/authentication.middleware"
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);

export default router;