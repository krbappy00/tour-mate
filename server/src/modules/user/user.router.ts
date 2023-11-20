import express from "express";
import {
  registerUser,
  loginUser,
  updateProfilePicture,
  userById,
  addMessages,
  getAll,
  getAllMessages,
} from "./user.controller";
import authentication from "../../middleware/authentication.middleware";
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.patch("/update-profilePicture", updateProfilePicture);
router.get("/get-user", userById);
router.post("/send-message", addMessages);
router.get("/get-all-messages", getAllMessages);
router.get("/get-all-user", getAll);

export default router;
