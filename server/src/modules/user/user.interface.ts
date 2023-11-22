import { Timestamp } from "mongodb";

export interface IUser {
  name: string;
  phone: number;
  email: string;
  password: string;
  profile_pic_url?: string;
  messages?: Message[];
  isSuperAdmin?: boolean;
  endpoint?: string;
  p256dh?: string;
  auth?: string;
}
export interface Message {
  senderId: string;
  senderName: string;
  recevierId: string;
  recevierName?: string;
  text: string;
  time: Date;
}
