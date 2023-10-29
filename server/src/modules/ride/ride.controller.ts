import { NextFunction, Request, Response } from "express";
import { addBookedRideToDb, addRideToDb, findRegisterdRideByuser, getRide } from "./ride.service";
import { Query } from "mongoose";


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
    const { startLong, startLat, endLong, endLat, date, seats } = req.query as Record<string, string>;

      const startLongn = parseFloat(startLong);
      const startLatn = parseFloat(startLat);
      const endLongn = parseFloat(endLong);
      const endLatn = parseFloat(endLat);
      const daten = new Date(date);
      const seatsn = parseInt(seats);
      const queryn = {startLongn,startLatn,endLongn,endLatn,daten,seatsn};
     
    try {
        const rideData = await getRide(queryn);
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

export const bookedRide =async (req:Request,res:Response,next:NextFunction) => {    
    try {
        const bookedData = await addBookedRideToDb(req.body);
        return res.status(200).json({
            status: "success",
            data:bookedData
        })
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error
        })
    }

}
export const getRideByUser:any = async (req:Request,res:Response,next:NextFunction)=>{
    const {userId} = req.query as Record<string, string>
    try {
        const ownRideData = await findRegisterdRideByuser(userId)
        return res.status(200).json({
            status:'sucess',
            data:ownRideData
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error
        })
    }
}