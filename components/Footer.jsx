import { GiFullPizza } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start justify-normal sm:justify-between sm:gap-2">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <GiFullPizza className="text2xl" />
              <span className="ml-2 text-lg font-bold">Pixza</span>
            </div>
            <p className="mt-4 text-gray-400 text-center md:text-left">
              Enjoy delicious meals delivered right to your doorstep.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-red-500" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-red-500" href="#">
                  Menu
                </a>
              </li>
              <li>
                <a className="hover:text-red-500" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-red-500" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-white" href="#">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.028 4.388 11.073 10.125 11.999v-8.437h-3.375v-3.562h3.375v-2.737c0-3.345 1.992-5.195 5.046-5.195 1.392 0 2.85.248 2.85.248v3.131h-1.602c-1.58 0-2.075.985-2.075 1.995v2.406h3.525l-.563 3.562h-2.962v8.437c5.737-.926 10.125-5.971 10.125-11.999z" />
                </svg>
              </a>
              <a className="text-gray-400 hover:text-white" href="#">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a className="text-gray-400 hover:text-white" href="#">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a className="flex items-center hover:text-red-500" href="#">
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.97 18.33c0 .59-.18 1.12-.55 1.6-.37.48-.86.78-1.47.9-.31.05-.66.08-1.05.08-1.66 0-3.77-.55-6.33-1.66-2.56-1.11-4.86-2.69-6.9-4.74-2.03-2.05-3.61-4.34-4.74-6.9C.55 5.05 0 2.94 0 1.28c0-.39.03-.74.08-1.05.12-.61.42-1.1.9-1.47.48-.37 1.01-.55 1.6-.55h3.92c.83 0 1.42.27 1.77.82.35.55.53 1.13.53 1.75 0 .64-.06 1.57-.17 2.78-.11 1.21-.16 2.02-.16 2.44 0 1.02.3 1.93.9 2.73.6.8 1.44 1.7 2.52 2.7 1.08 1 1.92 1.5 2.52 1.5.42 0 1.23-.05 2.44-.16 1.21-.11 2.14-.17 2.78-.17.62 0 1.2.18 1.75.53.55.35.82.94.82 1.77v3.92z"
                      fill="currentColor"
                    />
                  </svg>
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a className="flex items-center hover:text-red-500" href="#">
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
                      fill="currentColor"
                    />
                  </svg>
                  info@fooddelivery.com
                </a>
              </li>
              <li>
                <a className="flex items-center hover:text-red-500" href="#">
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
                      fill="currentColor"
                    />
                  </svg>
                  123 Main St, Anytown USA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
