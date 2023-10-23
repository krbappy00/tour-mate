import { Timestamp } from "mongodb";

export interface Iride {
    userId: string,
    date: Date,
    time: Timestamp,
    seat :Number,
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
}

export interface SearchQuery {
    startLongn: number;
    startLatn: number;
    endLongn: number;
    endLatn: number;
    daten: Date;
    seatsn:Number
  }