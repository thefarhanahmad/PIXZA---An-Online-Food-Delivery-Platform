import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// creating instance of razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// handler to create order
export async function POST(request, response) {
  try {
    const { amount, currency, receipt } = await request.json();

    if (!amount || !currency) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount",
        },
        { status: 400 }
      );
    }

    var options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
    };
    const order = await razorpay.orders.create(options);
    // console.log("order created (razorpay) : ", order);
    return NextResponse.json(
      {
        success: true,
        message: "Order created",
        orderId: order.id,
        orderDetails: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while creating order", error);
    return NextResponse.json(
      {
        success: false,
        message: "Order failed",
      },
      { status: 400 }
    );
  }
}
