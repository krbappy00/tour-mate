import { Iride } from "./ride.interface";
import Ride from "./ride.models";



export const addRideToDb = async (rideData: Iride): Promise<Iride> => {
    try {
        const ride = new Ride(rideData);
        await ride.save();
        return ride;
    } catch (err) {
        throw err;
    }
}
export const getRide = async (search: {} ): Promise<any> => {
    Ride.collection.createIndex({ "startCoordinates.coordinates": "2dsphere" });
    Ride.collection.createIndex({ "endCoordinates.coordinates": "2dsphere" });

    try {
        const userStartCoordinates = [90.373923,23.744806 ];
        const userEndCoordinates = [90.414391, 23.797911];
        const maxDistanceInKilometers = 10;
        const ride = await Ride.find({startCoordinates: {
            $geoWithin: {
              $centerSphere: [userStartCoordinates, maxDistanceInKilometers / 6371] // 6371 is the approximate radius of the Earth in kilometers
            }
          },
          endCoordinates: {
            $geoWithin: {
              $centerSphere: [userEndCoordinates, maxDistanceInKilometers / 6371]
            }
          }
        }).exec()
        return ride
        
    } catch (err) {
        throw err;
    }
}