import express from "express";
import {
  registerUser,
  loginUser,
  updateProfilePicture,
  userById,
} from "./user.controller";
import authentication from "../../middleware/authentication.middleware";
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.patch("/update-profilePicture", updateProfilePicture);
router.get("/get-user", userById);

export default router;
