"use client";

import React from "react";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <header className="bg-blue-800 text-white p-4 sm:p-4">
        <div className="mx-auto flex items-center justify-between">
          <div className="text-base xs:text-xl sm:text-2xl font-montserrat-medium">
            Logo
          </div>
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <Search className="absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 w-3 xs:w-4 h-3 xs:h-4 text-gray-200" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-7 xs:pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder:text-gray-200 text-white outline-gray-300 outline-1 text-xs xs:text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-xs xs:text-sm sm:text-base">Cart</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
