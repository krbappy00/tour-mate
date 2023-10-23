import { addMinutesToTime, formatDurationToHoursAndMinutes } from "../../utils/duration";
import { getUserById } from "../user/user.service";
import { Iride, SearchQuery } from "./ride.interface";
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
export const getRide = async (searchQuery: SearchQuery ): Promise<any> => {


    Ride.collection.createIndex({ "startCoordinates.coordinates": "2dsphere" });
    Ride.collection.createIndex({ "endCoordinates.coordinates": "2dsphere" });
    const {startLongn,startLatn,endLongn,endLatn,daten,seatsn} = searchQuery
    const userStartCoordinates = [startLongn, startLatn];
    const userEndCoordinates = [endLongn, endLatn];

 
    
    try {
      const maxDistanceInKilometers = 10;
      const rides = await Ride.find({startCoordinates: {
        $geoWithin: {
          $centerSphere: [userStartCoordinates, maxDistanceInKilometers / 6371]
        }
      },
      endCoordinates: {
        $geoWithin: {
          $centerSphere: [userEndCoordinates, maxDistanceInKilometers / 6371]
        }
      },
      date: daten,
      seat: { $gte: seatsn }
      }).lean().exec()

      const mapboxAccessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
      const travelProfile = 'mapbox/driving'; 

      const userStartCoordinatess = `${startLongn},${startLatn}`;
      const userEndCoordinatess = `${endLongn},${endLatn}`; 

      const promises =rides.map( async(ride) => {
        
        const rideStartCoordinates = `${ride.startCoordinates.coordinates[0]},${ride.startCoordinates.coordinates[1]}`;
        const rideEndCoordinates = `${ride.endCoordinates.coordinates[0]},${ride.endCoordinates.coordinates[1]}`;
        const userToStartURL = `https://api.mapbox.com/directions/v5/${travelProfile}/${userStartCoordinatess};${rideStartCoordinates}?access_token=${mapboxAccessToken}`;
        const userToEndURL = `https://api.mapbox.com/directions/v5/${travelProfile}/${userEndCoordinatess};${rideEndCoordinates}?access_token=${mapboxAccessToken}`;

        try{
          const rideStartCoordinates = `${ride.startCoordinates.coordinates[0]},${ride.startCoordinates.coordinates[1]}`;
          const rideEndCoordinates = `${ride.endCoordinates.coordinates[0]},${ride.endCoordinates.coordinates[1]}`;
          const rideDistanceUrl = `https://api.mapbox.com/directions/v5/${travelProfile}/${rideStartCoordinates};${rideEndCoordinates}?access_token=${mapboxAccessToken}`;

          const rideDistanceUrlRes = await fetch(rideDistanceUrl)
          const startRes = await fetch(userToStartURL)
          const endRes = await fetch(userToEndURL)

          const rideDistance = await rideDistanceUrlRes.json();
          const estimateTime = addMinutesToTime(ride.time,rideDistance.routes[0].duration/60)
          const estimateDuration = formatDurationToHoursAndMinutes(rideDistance.routes[0].duration)
          const sData = await startRes.json();
          const eData = await endRes.json();
          if (sData.routes && sData.routes.length > 0) {
            const distanceFromUserStart = sData.routes[0].distance / 1000;
            const distanceFromUserEnd = eData.routes[0].distance / 1000;
            const user = await getUserById(ride.userId)
            return { ...ride, distanceFromUserStart: distanceFromUserStart, distanceFromUserEnd: distanceFromUserEnd,user:user,estimateTime:estimateTime,estimateDuration:estimateDuration };

          } else {
            throw new Error('No route data found');
          }
        } catch (error) {
          console.error('Error calculating distance from user start to ride start:', error);
          return ride;
        }
      });

      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error('Error calculating distance and time from user end to ride end:', error);
    }}
