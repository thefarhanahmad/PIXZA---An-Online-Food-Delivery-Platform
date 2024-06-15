import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // create response and set cookies
    const response = NextResponse.json(
      {
        success: true,
        message: "User LoggedOut",
      },
      { status: 200 }
    );

    response.cookies.delete("token");

    // return response
    return response;
  } catch (error) {
    console.log("error while logout User", error);
    return NextResponse.json(
      {
        success: false,
        message: "error while login User",
      },
      { status: 400 }
    );
  }
};
