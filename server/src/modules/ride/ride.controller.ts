import { NextFunction, Request, Response } from "express";
import { addRideToDb, getRide } from "./ride.service";


export const registerRide = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const rideData = await addRideToDb(req.body);
        return res.status(200).json({
            status: "success",
            data:rideData
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}
export const getRideBySearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.body;
        const rideData = await getRide(search);
        console.log("from controller",rideData)
        return res.status(200).json({
            status: "success",
            data:rideData
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}