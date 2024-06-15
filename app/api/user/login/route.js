import connectDB from "@/app/config/db";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // console.log("data from json : ", email, password);

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const alreadyExistUser = await User.findOne({ email });
    if (!alreadyExistUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not Exists, Try to signup",
        },
        { status: 400 }
      );
    }

    const matchPassword = await bcrypt.compare(
      password,
      alreadyExistUser.password
    );

    if (matchPassword) {
      const token = jwt.sign(
        { userId: alreadyExistUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24hr",
        }
      );

      alreadyExistUser.password = undefined;

      // create response and set cookies
      const response = NextResponse.json(
        {
          success: true,
          message: "Login successfully",
          user: alreadyExistUser,
          token: token,
        },
        { status: 200 }
      );

      response.cookies.set("token", token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 3600000),
      });

      // return response
      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Credentials error",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("error while login User", error);
    return NextResponse.json(
      {
        success: false,
        message: "error while login User",
      },
      { status: 400 }
    );
  }
};
