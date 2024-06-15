import connectDB from "@/app/config/db";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  try {
    await connectDB();
    const { name, email, password, location } = await req.json();

    // console.log("data from json : ", name, email, password, location);

    if (!name || !email || !password || !location) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const alreadyExistUser = await User.findOne({ email });
    if (alreadyExistUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User Already Exists, Try to Login",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      location: location,
      profile: `https://api.dicebear.com/8.x/pixel-art/svg?seed=${name}`,
    });

    user.password = undefined;

    return NextResponse.json(
      {
        success: true,
        message: "registration successfull",
        user: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error while register User", error);
    return NextResponse.json(
      {
        success: false,
        message: "error while register User",
      },
      { status: 400 }
    );
  }
};
