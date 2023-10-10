import jwt from "jsonwebtoken"

import dotenv from 'dotenv';
dotenv.config();


const jwtkey = "b91165ed94c28b3d484d793627a2a8b8be55a37daacbcb8381b7036d5f1a093a";

export function getAuthToken(userId: string, expiresIn = '7d') {
    return jwt.sign({ userId }, jwtkey, {
        expiresIn,
    });
}

export function getPermanentAuthToken(userId: string) {
    return jwt.sign({ userId }, jwtkey);
}

export function verifyAuthToken(token: string): any {
    return jwt.verify(token, jwtkey);
}