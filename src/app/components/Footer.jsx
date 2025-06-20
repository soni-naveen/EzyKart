import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-blue-900 max-w-[1800px] mx-auto w-full text-white p-6 py-12 text-sm sm:text-base">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:place-self-center">
            <h3 className="text-lg sm:text-xl font-montserrat-medium mb-4">
              EzyKart
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:place-self-center">
            <h3 className="text-lg sm:text-xl font-montserrat-medium mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  target="_blank"
                  href="https://theecoride.in"
                  className="hover:text-blue-300"
                >
                  Ecoride
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://e-social.vercel.app"
                  className="hover:text-blue-300"
                >
                  E-Social
                </a>
              </li>
            </ul>
          </div>

          <div className="md:place-self-center">
            <h3 className="text-lg sm:text-xl font-montserrat-medium mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <div title="Facebook" className="bg-sky-600 p-1.5 rounded-full">
                <FaFacebookF className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer" />
              </div>
              <div title="Twitter" className="bg-sky-600 p-1.5 rounded-full">
                <FaTwitter className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer" />
              </div>
              <div title="Instagram" className="bg-sky-600 p-1.5 rounded-full">
                <FaInstagram className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center bg-blue-900 text-white pb-5 text-xs sm:text-sm">
        © 2025 EzyKart ● Developed by{" "}
        <a
          target="_blank"
          href="https://naveensoni.vercel.app"
          className="hover:underline"
        >
          Naveen Soni
        </a>
      </div>
    </>
  );
}
