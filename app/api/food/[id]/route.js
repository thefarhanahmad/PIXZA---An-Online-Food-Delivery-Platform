import connectDB from "@/app/config/db";
import FoodItem from "@/app/models/foods";
import { checkAdmin } from "@/utils/verifyAdmin";
import { NextResponse } from "next/server";

// food get by id handler
export const GET = async (req, context) => {
  await connectDB();
  try {
    // console.log("context : ", context);
    const { id } = context.params;
    // console.log("id from params : ", id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }

    const foods = await FoodItem.findById(id);
    if (!foods) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Item found",
        data: foods,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in finding food by id", error);
    return NextResponse.json(
      { success: false, message: "error in finding food by id" },
      { status: 400 }
    );
  }
};

// Update foods Controller
export async function PUT(req, context) {
  await connectDB();

  try {
    const isAdmin = await checkAdmin(req);
    if (isAdmin) {
      const { id } = context.params;
      // console.log("id from params : ", id);
      if (!id) {
        return NextResponse.json(
          { success: false, message: "food id not found" },
          { status: 400 }
        );
      }
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

      const foodItem = await FoodItem.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          name: name,
          category: category,
          foodType: foodType,
          price: price,
          description: description,
          img: img,
        }
      );
      return NextResponse.json(
        {
          success: true,
          message: "Food Item updated",
          data: foodItem,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "You're not an admin" },
      { status: 400 }
    );
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json(
      { success: false, message: "error in updating foods" },
      {
        status: 400,
      }
    );
  }
}

// food delete by id handler
export const DELETE = async (req, context) => {
  await connectDB();
  try {
    const isAdmin = await checkAdmin(req);
    if (isAdmin) {
      // console.log("context : ", context);
      const { id } = context.params;
      // console.log("id from params : ", id);
      if (!id) {
        return NextResponse.json(
          { success: false, message: "id is required" },
          { status: 400 }
        );
      }

      const food = await FoodItem.findByIdAndDelete(id);

      return NextResponse.json(
        {
          success: true,
          message: "Item deleted",
          detetedFood: food,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "You're not an admin" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("error in finding food by id", error);
    return NextResponse.json(
      { success: false, message: "error in finding food by id" },
      { status: 400 }
    );
  }
};
