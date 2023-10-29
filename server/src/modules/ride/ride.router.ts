import express from "express";
import { bookedRide, getRideBySearch, getRideByUser, registerRide } from "./ride.controller";
import authentication from "../../middleware/authentication.middleware"
const router = express.Router();

router.post("/register-ride", registerRide);
router.get("/search-ride",getRideBySearch)
router.post("/bookedRide",bookedRide)
router.get("/rideByuser",getRideByUser)

export default router;