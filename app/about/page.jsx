import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contactForm";

const About = () => {
  return (
    <div className="flex flex-col bg-gray-200 items-center min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-4 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphJTIwbWFyZ2hlcml0YXxlbnwwfHwwfHx8MA%3D%3D"
              width="550"
              height="550"
              alt="Pizza"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the Art of Pizza
                </h1>
                <p className="max-w-[600px] text-gray-800 md:text-xl dark:text-gray-700">
                  At Pizza Perfection, we're passionate about crafting the
                  finest pizza experience. Our mission is to bring you
                  delicious, high-quality pizzas that will tantalize your taste
                  buds and leave you craving more.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-orange-500 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 dark:bg-orange-500 dark:text-gray-900 dark:hover:bg-orange-500 dark:focus-visible:ring-orange-500"
                  prefetch={false}
                >
                  Explore Menu
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-orange-600  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-800 disabled:pointer-events-none disabled:opacity-50  dark:border-orange-700 dark:bg-gray-100 "
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-6">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-orange-500 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 dark:bg-orange-500 dark:text-gray-900 dark:hover:bg-orange-500 dark:focus-visible:ring-orange-500">
                  Our Specialties
                </div>
                <h2 className="text-3xl font-bold tracking-tighter text-gray-100 sm:text-5xl">
                  Delicious Pizza, Every Time
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  At Pizza Perfection, we take pride in our commitment to using
                  only the freshest, high-quality ingredients to craft our
                  delectable pizzas. From our signature dough recipe to our
                  carefully curated toppings, every bite is a symphony of
                  flavors that will leave you craving more.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-gray-200">
                        Artisanal Dough
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our dough is made fresh daily using a secret family
                        recipe, ensuring a perfect crust every time.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-gray-200">
                        Premium Toppings
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        We source the finest, locally-sourced ingredients to
                        create our signature pizza toppings.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-gray-200">
                        Baked to Perfection
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our pizzas are baked to golden-brown perfection in our
                        state-of-the-art ovens, ensuring a delightful texture
                        and flavor.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="https://imagevars.gulfnews.com/2023/09/04/Magherita-pizza-_18a6007a47a_large.jpg"
                width="550"
                height="310"
                alt="Pizza Toppings"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Meet the Founder
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-500">
                  Our team of passionate pizza enthusiasts is dedicated to
                  providing you with an unparalleled dining experience. Get to
                  know the founders behind Pizza Perfection.
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-5xl justify-center items-center gap-6 py-12 lg:flex-cols-3 lg:gap-12">
              <div className="flex flex-col   items-center justify-center space-y-4">
                <img
                  src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-cute-little-boy-chef-holding-a-silver-tray-png-image_6021308.png"
                  width="200"
                  height="200"
                  alt="Founder 1"
                  className="rounded-full w-32 h-32 object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-500 w-[50%] mx-auto text-center">
                    John is a seasoned chef with over 15 years of experience in
                    the pizza industry. He's passionate about crafting
                    innovative and delicious pizza recipes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    
        <ContactForm />
      </main>
    </div>
  );
};

export default About;
