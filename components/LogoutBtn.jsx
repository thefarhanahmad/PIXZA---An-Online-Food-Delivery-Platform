import { removeToken, removeUser } from "@/lib/features/auth/authSlice";
import { clearCart } from "@/lib/features/cart/cartSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
  // function to logout user
  const dispatch = useDispatch();
  const router = useRouter();
  const logOutUser = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const response = await axios.post("api/user/logout");
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        dispatch(removeToken());
        dispatch(clearCart());
        dispatch(removeUser());
        router.push("/login");
      } else {
        toast.error("Something went wrong", { id: toastId });
        return;
      }
    } catch (error) {
      console.log("error while logout User", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <div>
      <button
        onClick={logOutUser}
        className={`inline-flex items-center gap-2 bg-orange-500 px-4 py-1 rounded active:border-2 border-orange-700`}
      >
        <RiLogoutCircleRLine className="h-5 w-5" />
        <span className="">Logout</span>
      </button>
    </div>
  );
};

export default LogoutBtn;
