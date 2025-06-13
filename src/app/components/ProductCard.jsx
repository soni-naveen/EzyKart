"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/lib/store";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-white flex items-center justify-center">
          <Image
            width={200}
            height={300}
            src={product.image}
            alt={product.title}
            className="object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="font-montserrat-medium text-lg mb-2">
            {product.title}
          </h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating})
            </span>
          </div>
          <p className="text-2xl font-montserrat-bold mb-3">${product.price}</p>
          <div
            onClick={handleAddToCart}
            className="w-full text-center bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </div>
        </div>
      </div>
    </Link>
  );
}
