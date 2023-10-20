import { Schema, model } from "mongoose";
import { Iride } from "./ride.interface";

const locationSchema = new Schema({
    type: String,
    coordinates:[Number]},
    {
        _id: false
  });


// creating schema using interface
const rideSchema = new Schema<Iride>({
    userId: { type: String, required: true, unique: false },
    date: { type: Date, required: true, unique: false },
    time: { type: String, required: true, unique: false },
    seat: { type: Number, required: true, unique: false },
    price: { type: Number, required: true, unique: false },
    allowPet: { type: Boolean, required: true, unique: false },
    allowSmoking: { type: Boolean, required: true, unique: false },
    allowAlcohol: { type: Boolean, required: true, unique: false },
    startCoordinates: { type:locationSchema, required: true, unique: false },
    endCoordinates: { type: locationSchema, required: true, unique: false },
    startPlaceName: { type: String, required: true, unique: false },
    endPlaceName: { type: String, required: true, unique: false },
});

const Ride = model("Ride", rideSchema);

export default Ride;