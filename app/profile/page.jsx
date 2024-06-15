"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import LogoutBtn from "@/components/LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { removeToken, removeUser } from "@/lib/features/auth/authSlice";
import { clearCart } from "@/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";

export default function Component() {
  const { user } = useSelector((state) => state.auth);
  // console.log("user profile : ", user);
  const dispatch = useDispatch();
  const router = useRouter();

  // DELETE ACCOUNT
  const deleteAccount = async () => {
    const toastId = toast.loading("Deleting Profile...");
    try {
      const response = await axios.delete("/api/user/delete");
      // console.log("delete account response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        dispatch(removeToken());
        dispatch(removeUser());
        dispatch(clearCart());
        router.push("/login");
      } else {
        toast.error(response.data.message, { id: toastId });
        return;
      }
    } catch (error) {
      console.log("error in delete user profile", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <div className="flex bg-gray-200 p-3 sm:p-6 w-full flex-col min-h-[60vh]">
      <header className="bg-gray-500 w-11/12 mx-auto text-white sm:px-6 sm:py-4 p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="sm:text-2xl text-xl font-semibold ">
            {user?.isAdmin ? "Admin Profile" : "Your Profile"}
          </h1>
        </div>

        <span>
          <LogoutBtn />
        </span>
      </header>
      <main className="flex-1 w-11/12 mx-auto bg-gray-300 sm:p-8 p-6 items-center justify-center">
        <div className="max-w-fit mx-auto bg-white  dark:bg-white flex justify-center items-center rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-1">
            <div className="bg-white text-gray-800 p-8 flex flex-col items-center justify-center">
              <Avatar className="h-32 w-32 mb-4 border border-gray-500 p-3 ">
                <AvatarImage alt="@shadcn" src={user?.profile} />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <div className="text-xl font-medium">{user?.name}</div>
              <div className="text-sm text-gray-400">{user?.email}</div>
              <div className="text-sm text-gray-400 mt-2">{user?.location}</div>
            </div>
          </div>
        </div>
        <div className="max-w-fit mx-auto mt-6 bg-red-600 px-6 py-2 rounded text-white font-semibold">
          <button
            onClick={() => {
              deleteAccount();
            }}
          >
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
}
