import User from "@/app/models/user";
import { getDataFromToken } from "./getDataFromToken";
import { NextResponse } from "next/server";

export const checkAdmin = async (req) => {
  try {
    const { userId } = await getDataFromToken(req);
    // console.log("user id from token : ", userId);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User id not found",
      });
    }

    const user = await User.findById(userId);
    // console.log("user from verify admin route : ", user);

    if (user.isAdmin) {
      NextResponse.json({
        success: true,
        message: "You're verified admin",
      });
      return true;
    } else {
      NextResponse.json({
        success: false,
        message: "You're not an admin",
      });
      return false;
    }
  } catch (error) {
    console.log("error in verify admin : ", error);
    return NextResponse.json({
      success: false,
      message: "Error to verify admin",
    });
  }
};
