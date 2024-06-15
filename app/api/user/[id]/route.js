import connectDB from "@/app/config/db";
import User from "@/app/models/user";
import { checkAdmin } from "@/utils/verifyAdmin";
import { NextResponse } from "next/server";

// Delete user
export const DELETE = async (req, context) => {
  await connectDB();
  try {
    const isAdmin = await checkAdmin(req);
    if (isAdmin) {
      const { id } = context.params;
      // console.log("id from params : ", id);
      if (!id) {
        return NextResponse.json(
          { message: "id is required" },
          { status: 400 }
        );
      }
      const user = await User.findByIdAndDelete(id);
      return NextResponse.json(
        {
          success: true,
          message: "user deleted",
          user: user,
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
    console.log("error in deleting user : ", error);
    return NextResponse.json(
      {
        success: false,
        message: "error in deleting user",
      },
      { status: 400 }
    );
  }
};
