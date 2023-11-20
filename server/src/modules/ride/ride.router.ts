import express from "express";
import {
  bookedRide,
  deletRide,
  getBookedRideByUser,
  getRideByLocation,
  getRideBySearch,
  getRideBySingelDestination,
  getRideByUser,
  getSingelRide,
  notification,
  registerRide,
} from "./ride.controller";
import authentication from "../../middleware/authentication.middleware";
import { getRideByDestionation } from "./ride.service";
const router = express.Router();

router.post("/register-ride", registerRide);
router.get("/search-ride", getRideBySearch);
router.post("/bookedRide", bookedRide);
router.get("/rideByuser", getRideByUser);
router.get("/bookedRideByuser", getBookedRideByUser);
router.delete("/cancelRide/:rideId", deletRide);
router.get("/getRideById/:rideId", getSingelRide);
router.get("/getRideByTwoLocation", getRideByLocation);
router.get("/getRideBySingleSource", getRideBySingelDestination);
router.get("/notification", notification);

export default router;
