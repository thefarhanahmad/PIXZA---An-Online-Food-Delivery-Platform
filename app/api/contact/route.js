//Contact us controller

import connectDB from "@/app/config/db";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();

  try {
    const { name, email, message, subject } = await req.json();

    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Fields can't be empty",
        },
        {
          status: 400,
        }
      );
    }

    const data = await Contact.create({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent",
        data: data,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json(
      {
        message: "error in contact us page",
      },
      {
        status: 400,
      }
    );
  }
}
