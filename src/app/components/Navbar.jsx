"use client";

import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/app/lib/store";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", searchQuery.trim());
      router.push(`/?${params.toString()}`);
    }
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p className="text-xs sm:text-sm bg-blue-800 p-6.5 text-white text-center">Loading...</p>;
  }

  return (
    <>
      <header className="bg-blue-800 text-white p-4">
        <div className="mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-base xs:text-xl sm:text-2xl font-montserrat-medium"
          >
            Logo
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md mx-4 sm:mx-8"
          >
            <div className="relative">
              <Search className="absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 w-3 xs:w-4 h-3 xs:h-4 text-gray-200" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 xs:pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder:text-gray-200 text-white outline-gray-300 outline-1 text-xs xs:text-sm sm:text-base"
              />
            </div>
          </form>

          <Link href="/cart" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute top-2 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-montserrat-medium">
                  {totalItems}
                </span>
              )}
              <span className="text-xs xs:text-sm sm:text-base">Cart</span>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}
