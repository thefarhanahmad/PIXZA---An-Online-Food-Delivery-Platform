import connectDB from "@/app/config/db";
import Order from "@/app/models/order";
import User from "@/app/models/user";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    await connectDB();

    const { userId } = await getDataFromToken(req);
    // console.log("user id from token : ", userId);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User Id not found",
        },
        { status: 400 }
      );
    }

    const { cartItems } = await req.json();

    // console.log("data from json : ", cartItems);

    if (!cartItems) {
      return NextResponse.json(
        {
          success: false,
          message: "cartItems are empty",
        },
        { status: 400 }
      );
    }

    const order = await Order.create({
      myOrders: cartItems,
    });

    // update users and push created order in logged in user
    const updatedUserOrder = await User.findByIdAndUpdate(
      { _id: userId },

      {
        $push: {
          orders: order._id,
        },
      },
      { new: true }
    ).populate("orders");

    return NextResponse.json(
      {
        success: true,
        message: "Foods Ordered successfully",
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error while ordering foods", error);
    return NextResponse.json(
      {
        success: false,
        message: "error while ordering foods",
      },
      { status: 400 }
    );
  }
};

// get users orders
export const GET = async (req, res) => {
  try {
    await connectDB();
    const { userId } = await getDataFromToken(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 400 }
      );
    }
    const user = await User.findById(userId).populate("orders");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const orders = user.orders.flatMap((order) => order.myOrders);

    return NextResponse.json(
      {
        success: true,
        message: "Orders found",
        data: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while getting orders", error);
    return NextResponse.json(
      {
        success: false,
        message: "error while getting orders",
      },
      { status: 400 }
    );
  }
};
