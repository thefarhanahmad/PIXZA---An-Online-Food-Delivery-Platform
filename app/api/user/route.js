import connectDB from "@/app/config/db";
import User from "@/app/models/user";
import { checkAdmin } from "@/utils/verifyAdmin";
import { NextResponse } from "next/server";

// Getting all users
export const GET = async (req, res) => {
  await connectDB();
  try {
    const isAdmin = await checkAdmin(req);
    if (isAdmin) {
      const users = await User.find();
      return NextResponse.json(
        {
          success: true,
          message: "Users founds",
          UsersAre: users.length,
          users: users,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "you're not an admin",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("error in finding all users : ", error);
    return NextResponse.json(
      {
        success: false,
        message: "error in finding all users",
      },
      { status: 400 }
    );
  }
};
