import { Schema, model } from "mongoose";
import { Iride, bookedRide } from "./ride.interface";

const locationSchema = new Schema(
  {
    type: String,
    coordinates: [Number],
  },
  {
    _id: false,
  }
);

// creating schema using interface
const rideSchema = new Schema<Iride>({
  userId: { type: String, required: true, unique: false },
  date: { type: Date, required: true, unique: false },
  time: { type: String, required: true, unique: false },
  seat: { type: Number, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
  allowPet: { type: Boolean, required: false, unique: false },
  allowSmoking: { type: Boolean, required: false, unique: false },
  allowAlcohol: { type: Boolean, required: false, unique: false },
  startCoordinates: { type: locationSchema, required: true, unique: false },
  endCoordinates: { type: locationSchema, required: true, unique: false },
  startPlaceName: { type: String, required: true, unique: false },
  endPlaceName: { type: String, required: true, unique: false },
  bookedSeat: { type: Number, required: false, unique: false },
  pickUpPoints1: { type: Array, required: false },
  pickUpPoints2: { type: Array, required: false },
  pickUpPoints3: { type: Array, required: false },
});

const bookedRideSchema = new Schema<bookedRide>({
  userId: { type: String, required: true },
  rideId: { type: String, required: true },
  bookedSeat: { type: Number, required: true },
});

export const BookedRide = model("BooKedRide", bookedRideSchema);
const Ride = model("Ride", rideSchema);

export default Ride;
