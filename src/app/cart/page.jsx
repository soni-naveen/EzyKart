"use client";

import { useRouter } from "next/navigation";
import { Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/lib/store";

export default function Cart() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => {
          router.back();
        }}
        className="mb-6 flex items-center gap-2 text-blue-600 font-montserrat-medium hover:text-blue-800 cursor-pointer"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h1 className="text-2xl sm:text-3xl font-montserrat-medium mb-6">
        My Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-600 font-montserrat-medium text-xl sm:text-2xl text-center py-8">
            Your cart is empty!
          </p>
          <Link
            href="/"
            className="border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white py-2 px-5 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col xs:flex-row gap-5 xs:gap-0 xs:items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
                  <Image
                    width={200}
                    height={300}
                    src={item.image}
                    alt={item.title}
                    className="object-contain"
                  />
                </div>
                <div className="pr-2">
                  <h3 className="font-montserrat-medium">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              <div className="flex flex-row-reverse xs:flex-row items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 sm:py-1.5 border-x">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <p className="font-montserrat-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <div className="flex justify-between items-center text-base sm:text-lg font-montserrat-medium">
              <p>
                Total: <span className="font-montserrat-bold">${getTotalPrice().toFixed(2)}</span>
              </p>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
