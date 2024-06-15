import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// getting user profile
export const getDataFromToken = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    // console.log("token from cookies : ", token);
    if (!token) {
      return NextResponse.json({ message: "Invalid token" });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded token : ", decodedToken);
    return decodedToken;
  } catch (error) {
    console.log("error in verify token", error);
    return NextResponse.json({ message: "error in verify token" });
  }
};
