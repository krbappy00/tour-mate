import express from "express";
import { getRideBySearch, registerRide } from "./ride.controller";
import authentication from "../../middleware/authentication.middleware"
const router = express.Router();

router.post("/register-ride", registerRide);
router.get("/search-ride",getRideBySearch)

export default router;