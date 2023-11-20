import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
const messageSchema = new Schema({
  senderId: { type: String, required: true, unique: false },
  senderName: { type: String, required: true, unique: false },
  recevierId: { type: String, required: true, unique: false },
  text: { type: String, required: true, unique: false },
  time: { type: Date, required: true, unique: false, default: Date.now },
});
// creating schema using interface
const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: false },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  profile_pic_url: { type: String, required: false, unique: false },
  messages: [messageSchema],
  isSuperAdmin: { type: Boolean, required: false, unique: false },
  endpoint: { type: String, required: false, unique: false },
  p256dh: { type: String, required: false, unique: false },
  auth: { type: String, required: false, unique: false },
});

const User = model("User", userSchema);

export default User;
