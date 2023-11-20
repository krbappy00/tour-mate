import { NextFunction, Request, Response } from "express";
const webpush = require("web-push");

import {
  addBookedRideToDb,
  addRideToDb,
  deletRideById,
  findBookedRideByuser,
  findRegisterdRideByuser,
  getRide,
  getRideByDestionation,
  getRideByLocationOnly,
  getRideByRideId,
} from "./ride.service";
import { Query } from "mongoose";

export const registerRide = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rideData = await addRideToDb(req.body);
    return res.status(200).json({
      status: "success",
      data: rideData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const getRideBySearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startLong, startLat, endLong, endLat, date, seats } =
    req.query as Record<string, string>;

  const startLongn = parseFloat(startLong);
  const startLatn = parseFloat(startLat);
  const endLongn = parseFloat(endLong);
  const endLatn = parseFloat(endLat);
  const daten = new Date(date);
  const seatsn = parseInt(seats);
  const queryn = { startLongn, startLatn, endLongn, endLatn, daten, seatsn };

  try {
    const rideData = await getRide(queryn);
    return res.status(200).json({
      status: "success",
      data: rideData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const bookedRide = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookedData = await addBookedRideToDb(req.body);
    return res.status(200).json({
      status: "success",
      data: bookedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const getRideByUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query as Record<string, string>;
  try {
    const ownRideData = await findRegisterdRideByuser(userId);
    return res.status(200).json({
      status: "sucess",
      data: ownRideData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const getBookedRideByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query as Record<string, string>;
  try {
    const bookedRideData = await findBookedRideByuser(userId);
    return res.status(200).json({
      status: "sucess",
      data: bookedRideData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const deletRide = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rideId } = req.params;
  try {
    const rideData = await deletRideById(rideId);
    return res.status(200).json({
      status: "sucess",
      data: rideData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const getSingelRide = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rideId } = req.params;
  try {
    const rideData = await getRideByRideId(rideId);
    return res.status(200).json({
      status: "sucess",
      data: rideData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const getRideByLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startLong, startLat, endLong, endLat } = req.query as Record<
    string,
    string
  >;

  const startLongn = parseFloat(startLong);
  const startLatn = parseFloat(startLat);
  const endLongn = parseFloat(endLong);
  const endLatn = parseFloat(endLat);

  const queryn = { startLongn, startLatn, endLongn, endLatn };

  try {
    const rideData = await getRideByLocationOnly(queryn);
    return res.status(200).json({
      status: "success",
      data: rideData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const getRideBySingelDestination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startLong, startLat, endLong, endLat } = req.query as Record<
    string,
    string
  >;

  const startLongn = parseFloat(startLong);
  const startLatn = parseFloat(startLat);
  const endLongn = parseFloat(endLong);
  const endLatn = parseFloat(endLat);

  const queryn = { startLongn, startLatn, endLongn, endLatn };

  try {
    const rideData = await getRideByDestionation(queryn);
    return res.status(200).json({
      status: "success",
      data: rideData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const notification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hit");
  try {
    const subscription = {
      endpoint:
        "https://fcm.googleapis.com/fcm/send/fjoNsvZRvl0:APA91bHWCor00Wh1hOWaPTw70CrpsZTFdR-pJZHPIyND0RuqXBHqWarLygKMuPinhKBQIyuO5HBx0MITBR4Zr6Gpsb7X_kpJIScGeY5pMtxp-ZjN5sdATlpUwLdMluj8w0wKPomX5AY4",
      expirationTime: null,
      keys: {
        auth: "ECkEVL5eAcaxozyx2PE0nA",
        p256dh:
          "BOL3SgTgxStHfnQ6j3B7TAwAVCbl63T3YiU-8PIe4e4e1OOkojmVeYYDwHI9VBNwTNZ8yCROStRVisFQUaKnT4g",
      },
    }; // new
    const payload = {
      notification: {
        title: "Your ride Booked successfully!",
        body: "Thank you for ride with us",
        icon: "assets/icons/icon-384x384.png",
        actions: [
          { action: "bar", title: "Home" },
          { action: "baz", title: "Profile" },
        ],
        data: {
          onActionClick: {
            default: { operation: "openWindow" },
            bar: {
              operation: "focusLastFocusedOrOpen",
              url: "",
            },
            baz: {
              operation: "navigateLastFocusedOrOpen",
              url: "/profile",
            },
          },
        },
      },
    };
    const private_key = "xvJO9u-jvsrMQD_hXzyQTHSSXc5Jz9ltFKMBf8qtZIc";
    const public_key =
      "BFSlTgd4jZQCf71quwfwrrjcsEGLAwJMVuaXEnIAJ4HLfkb1EEcSVDjWdUA-QUpVbX7TIq-UH6Ryob__vB5flJI";
    const options = {
      vapidDetails: {
        subject: "mailto:example_email@example.com",
        publicKey: public_key,
        privateKey: private_key,
      },
      TTL: 60,
    };
    // send notification
    webpush
      .sendNotification(subscription, JSON.stringify(payload), options)
      .then((_: any) => {})
      .catch((_: any) => {
        console.log(_);
      });
    res.status(200).json({
      hit: "ok",
    });
  } catch {}
};
