import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async (userData: IUser): Promise<any> => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};
export const getUserByEmailFromDB = async (payload: string): Promise<any> => {
  try {
    const user = await User.findOne({ email: payload });
    return user as IUser;
  } catch (err) {
    throw err;
  }
};
export const getUserById = async (payload: string): Promise<any> => {
  try {
    const user = await User.findById({ _id: payload });
    return user as any;
  } catch (err) {
    throw err;
  }
};
export const setProfilePicture = async (
  userId: string,
  url: string
): Promise<IUser> => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { profile_pic_url: url },
      { new: true }
    );

    return user as any;
  } catch (err) {
    throw err;
  }
};
export const getAllUserFromDb = async (): Promise<any> => {
  try {
    const alluser = await User.find();
    return alluser;
  } catch (err) {
    throw err;
  }
};
export const addMessageToDb = async (messages: any): Promise<any> => {
  try {
    console.log(messages);
    const { recevierId, senderId, message, senderName } = messages;
    const userName = await User.findById({ _id: recevierId });
    const addMessageToSenderDb = await User.findByIdAndUpdate(
      senderId,
      {
        $push: {
          messages: {
            senderName: "Own message",
            recevierId: recevierId,
            recevierName: userName?.name,
            text: message,
          },
        },
      },
      { new: true }
    );
    if (!addMessageToSenderDb) {
      throw new Error("User not found");
    }
    const user = await User.findByIdAndUpdate(
      recevierId,
      {
        $push: {
          messages: {
            senderName: senderName,
            senderId: senderId,
            text: message,
          },
        },
      },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw err;
  }
};
export const getAllMessagesByuserId = async (params: string): Promise<any> => {
  try {
    const user = await User.findById({ _id: params });
    if (user) {
      return user.messages;
    }

    // if (user) {
    //   const pipeline = [
    //     { $unwind: "$messages" },
    //     {
    //       $group: {
    //         _id: "$messages.senderId",
    //         allTexts: { $push: "$messages.text" },
    //         allMessages: { $push: "$messages" },
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         senderName: "$senderName",
    //         senderId: "$_id",
    //         allTexts: 1,
    //         allMessages: 1,
    //         myMessageTosender: {
    //           $cond: {
    //             if: {
    //               $in: [user._id, "$allMessages.senderId"],
    //             },
    //             then: true,
    //             else: false,
    //           },
    //         },
    //       },
    //     },
    //   ];
    //   const result = await User.aggregate(pipeline).exec();
    //   return result;
    // }
  } catch (error) {
    console.log(error);
  }
};
