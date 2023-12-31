import { NextFunction, Request, Response } from "express";
import {
  addMessageToDb,
  createUserToDB,
  getAllMessagesByuserId,
  getAllUserFromDb,
  getUserByEmailFromDB,
  getUserById,
  setProfilePicture,
} from "./user.service";
import { encryptPassword, checkPassword } from "../../utils/password";
import { getAuthToken } from "../../utils/authentication";
import { findRegisterdRideByuser } from "../ride/ride.service";
import User from "./user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const alreadyHave = await getUserByEmailFromDB(email);
    if (alreadyHave) {
      return res.status(302).json({
        status: "success",
        data: "Email Already Exist",
      });
    }

    let encPassword = await encryptPassword(password);
    req.body.password = encPassword;
    const userData = await createUserToDB(req.body);
    const token = getAuthToken(userData._id);

    return res.status(200).json({
      status: "success",
      token: token,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("null did not taken");
    const userData = await getUserByEmailFromDB(email);
    if (!userData) throw new Error("email not exist");

    let isVerified = await checkPassword(password, userData.password);
    if (isVerified) {
      const user = await User.findByIdAndUpdate(
        userData._id,
        {
          endpoint: req.body.endpoint,
          auth: req.body.auth,
          p256dh: req.body.p256dh,
        },
        { upsert: true, new: true }
      );
    }

    if (!isVerified) {
      return res.status(301).json({
        status: "error",
        error: "Authentication Error",
      });
    }
    const token = getAuthToken(userData._id);
    return res.status(200).json({
      status: "success",
      token: token,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, url } = req.body;
    const user = await setProfilePicture(userId, url);
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const userById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query as Record<string, string>;
    const user = await getUserById(userId);
    const registerRide = await findRegisterdRideByuser(userId);
    return res.status(200).json({
      status: "success",
      data: user,
      totalRide: registerRide.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const addMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { senderId, recevierId, message } = req.body;
  try {
    const user = await addMessageToDb(req.body);
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAllUserFromDb();
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query as Record<string, string>;
  try {
    const user = await getAllMessagesByuserId(userId);
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
