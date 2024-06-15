import User from "@/app/models/user";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
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

    const user = await User.findByIdAndDelete(userId);
    user.password = undefined;
    const response = NextResponse.json(
      {
        success: true,
        message: "Account Deleted",
        deletedUser: user,
      },
      { status: 200 }
    );

    response.cookies.delete("token");

    // return response
    return response;
  } catch (error) {
    console.log("error in delete user by id", error);
    return NextResponse.json(
      {
        success: false,
        message: "error in delete user",
      },
      { status: 400 }
    );
  }
};
