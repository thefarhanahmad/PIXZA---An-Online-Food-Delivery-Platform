import User from "@/app/models/user";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const { userId } = await getDataFromToken(req);
    // console.log("user id from token : ", userId);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User id not found",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    user.password = undefined;
    return NextResponse.json(
      {
        success: true,
        message: "User found",
        user: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in finding user by id", error);
    return NextResponse.json(
      {
        success: false,
        message: "error in finding user by id",
      },
      { status: 400 }
    );
  }
};
