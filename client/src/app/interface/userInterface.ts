export interface IUser {
  name: string;
  phone: number;
  email: string;
  password: string;
  profile_pic_url?: string;
  isSuperAdmin?: boolean;
}
