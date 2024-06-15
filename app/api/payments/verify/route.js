import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// generate razorpay signature
const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_SECRET;
  if (!keySecret) {
    // throw new Error("Razorpay key secret is not defined.");
    return NextResponse.json(
      { message: "Razorpay key secret is not defined", success: false },
      { status: 400 }
    );
  }

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

// handler to verify order
export async function POST(request) {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    if (!orderCreationId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Payment Failed" },
        { status: 400 }
      );
    }

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
      console.log("signature and razorpay signature not mathcing");
      return NextResponse.json(
        { message: "payment verification failed", success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "payment verified successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in verify order/payment", error);
    return NextResponse.json(
      { message: "payment verification failed", success: false },
      { status: 400 }
    );
  }
}
