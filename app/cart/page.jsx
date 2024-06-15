"use client";
import { clearCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import EmptyCart from "@/components/EmptyCart";

const page = () => {
  const { cartItems } = useSelector((state) => state.cart);
  // console.log("items in cart {Cart Page} : ", cartItems);
  const router = useRouter();
  const dispatch = useDispatch();
  const totalPrice = cartItems?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  const { user } = useSelector((state) => state.auth);

  // function to create order and return order id
  const createOrder = async () => {
    try {
      if (user) {
        const options = {
          amount: totalPrice * 100,
          currency: "INR",
          receipt: "rcp2",
        };
        const order = await axios.post("/api/payments/order", options);
        // console.log("created order api response : ", order);
        if (!order.data.success) {
          console.log("Order Failed while creating order");
        }

        // console.log("order created");
        const orderId = order.data.orderId;
        return orderId;
      } else {
        toast.error("Login First")
        router.push("/login");
      }
    } catch (error) {
      console.log("error during create order : ", error);
    }
  };

  // function to checkout order and placed
  const processPayment = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Placing Order...");
    try {
      const orderId = await createOrder();
      // console.log("order id in process payment : ", orderId);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: parseFloat(totalPrice) * 100,
        currency: "INR",
        name: user.name,
        description:
          "At Pixza, we're passionate about crafting the finest pizza experience.",
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          // console.log("options obj in process payment : ", options);
          // console.log("data obj in process payment : ", options.handler);
          const result = await axios.post(
            "/api/payments/verify",
            JSON.stringify(data)
          );
          // console.log("result after verify order : ", result);
          if (result.data.success) {
            try {
              const res = await axios.post("/api/foodOrders", {
                cartItems: cartItems,
              });
              // console.log("order creation res : ", res);
              if (res.data.success) {
                toast.success("Food Ordered Successfully", { id: toastId });
                router.push("/orders");
                dispatch(clearCart());
              } else {
                toast.error("Order failed", { id: toastId });
              }
            } catch (error) {
              console.log("error while order items", error);
              toast.error("Order Failed", { id: toastId });
            }
          } else {
            toast.error(result.data.message, { id: toastId });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment failed", function (response) {
        toast.error(response.error.description, { id: toastId });
      });
      paymentObject.open();
    } catch (error) {
      console.log("error while razorpay checkout open", error);
      toast.error("Order failed", { id: toastId });
    }
  };

  return (
    <div className=" py-6  w-full bg-gray-200  mx-auto px-4 sm:px-6 lg:px-8">
      {cartItems.length === 0 ? (
        <div className="">
          <EmptyCart />
        </div>
      ) : (
        <div className="py-6 sm:py-8 sm:w-11/12 mx-auto">
          <h1 className=" text-xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Your Cart
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-200 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Food</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <img
                        src={item.img}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        <TrashIcon className="h-5 w-5 text-red-500 " />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center ">
            <div className="text-sm sm:text-lg font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button
              onClick={processPayment}
              className="bg-orange-500 text-sm sm:text-lg px-3 py-1.5 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default page;
