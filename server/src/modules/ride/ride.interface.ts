import { Timestamp } from "mongodb";

export interface Iride {
    userId: string,
    date: Date,
    time: Timestamp,
    seat :number,
    price:Number,
    allowPet:boolean,
    allowSmoking:Boolean,
    allowAlcohol:Boolean,
    startCoordinates: {
        type: String,
        coordinates: [Number,Number]
    },
    endCoordinates: {
        type: String,
        coordinates: [Number,Number]
    },
    startPlaceName:String,
    endPlaceName:String
    distanceFromUserStart?:Number
    distanceFromUserEnd?:Number
    bookedSeat?:number
}

export interface SearchQuery {
    startLongn: number;
    startLatn: number;
    endLongn: number;
    endLatn: number;
    daten: Date;
    seatsn:Number
  }

export interface bookedRide {
    userId: string,
    rideId: string,
    bookedSeat: number,
}