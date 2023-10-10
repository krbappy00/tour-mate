import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

// creating schema using interface
const userSchema = new Schema<IUser>({
    name: { type: String, required: true, unique: false },
    phone:{type:Number,required:true,unique:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    profile_pic_url: { type: String, required: false, unique: false },
});

const User = model("User", userSchema);

export default User;