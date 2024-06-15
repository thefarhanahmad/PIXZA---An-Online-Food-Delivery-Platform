import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreProvider from "./storeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixza - An Online Food Delivery Platform",
  description:
    "Pixza is a comprehensive online food delivery platform that allows users to browse, order, and manage food items seamlessly. Users can sign up, log in, add items to their cart, and make payments through Razorpay. Admin users have additional capabilities to manage food items and user accounts, ensuring an efficient and smooth experience for all. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
