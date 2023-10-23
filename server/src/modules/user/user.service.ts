import { IUser } from "./user.interface";
import User from "./user.model";


export const createUserToDB = async (userData: IUser): Promise<IUser> => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
}
export const getUserByEmailFromDB = async (payload: string): Promise<IUser> => {
    try {
        const user = await User.findOne({ email: payload });
        return user as IUser;
    } catch (err) {
        throw err;
    }
}
export const getUserById = async (payload: string): Promise<IUser> => {
    try {
        const user = await User.findById({_id:payload});
        // console.log(user)
        return user as IUser;
    } catch (err) {
        throw err;
    }
}
export const getAllUserFromDb =  ():string=>{
    try{
        // const alluser = await User.find();
        return "url hit";
    } catch(err){
        throw err;
    }
}