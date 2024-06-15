import connectDB from "@/app/config/db";
import FoodItem from "@/app/models/foods";
import { checkAdmin } from "@/utils/verifyAdmin";
import { NextResponse } from "next/server";

//Get all Foods controller
export async function GET(req, res) {
  await connectDB();
  try {
    const data = await FoodItem.find();

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Food items not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Food items found",
        quantity: data.length,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error in finding foods" },
      { status: 400 }
    );
  }
}

//Create Foods controller
export async function POST(req, res) {
  await connectDB();

  try {
    const isAdmin = await checkAdmin(req);
    if (isAdmin) {
      const { name, category, foodType, price, description, img } =
        await req.json();

      if (!name || !category || !foodType || !price || !description || !img) {
        return NextResponse.json(
          {
            success: false,
            message: "Fields can't be empty",
          },
          { status: 400 }
        );
      }
      if (category === "Pizza") {
        if (!price.medium || !price.regular || !price.large)
          return NextResponse.json(
            {
              success: false,
              message: "Invalid price",
            },
            { status: 400 }
          );
      } else if (category === "SIDES & BEVERAGES") {
        if (!price.single || !price.double)
          return NextResponse.json(
            {
              success: false,
              message: "Invalid price",
            },
            { status: 400 }
          );
      }

      const foodItem = await FoodItem.create({
        name: name,
        category: category,
        foodType: foodType,
        price: price,
        description: description,
        img: img,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Food Added to the MenuList",
          food: foodItem,
        },
        {
          status: 201,
        }
      );
    }
    return NextResponse.json(
      { success: false, message: "You're not an admin" },
      {
        status: 401,
      }
    );
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json(
      {
        success: false,
        message: "error in Adding foods",
      },
      {
        status: 400,
      }
    );
  }
}
