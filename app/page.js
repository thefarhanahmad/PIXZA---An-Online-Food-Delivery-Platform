import CarouselComponent from "@/components/CarouselComponent";
import Products from "@/components/Products";
import Script from "next/script";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <CarouselComponent />
      <Products />
    </div>
  );
}
