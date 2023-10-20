import { NextFunction, Request, Response } from "express";
import { createUserToDB,getUserByEmailFromDB } from "./user.service";
import { encryptPassword, checkPassword } from "../../utils/password";
import { getAuthToken } from "../../utils/authentication";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("Router Hit")
    
    try {
        const { email, password } = req.body;
        

        const alreadyHave = await getUserByEmailFromDB(email);
        if (alreadyHave) {
            return res.status(302).json({
                status: "success",
                data: "Email Already Exist"
            })
        }

        let encPassword = await encryptPassword(password);
        req.body.password = encPassword;
        const userData = await createUserToDB(req.body);
        const token = getAuthToken(userData._id);

        return res.status(200).json({
            status: "success",
            token: token,
            data: userData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("null did not taken");

        const userData = await getUserByEmailFromDB(email);
        if (!userData) throw new Error("email not exist");

        let isVerified = await checkPassword(password, userData.password);
        // console.log(userData, isVerified);

        if (!isVerified) {
            return res.status(301).json({
                status: "error",
                error: "Authentication Error"
            })
        }
        const token = getAuthToken(userData._id)
        return res.status(200).json({
            status: "success",
            token: token,
            data: userData
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}