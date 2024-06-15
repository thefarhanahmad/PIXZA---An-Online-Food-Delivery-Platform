import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center  justify-center py-10 sm:py-0 sm:min-h-[80dvh]">
      <div className=" text-center space-y-4">
        <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-500">
          It looks like you haven't added any items to your cart yet. Start
          explore to fill it up!
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-800 disabled:pointer-events-none disabled:opacity-50 dark:bg-orange-500 dark:text-gray-900 dark:hover:bg-orange-600 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Add some delicious food to your cart!
        </Link>
      </div>
    </div>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
