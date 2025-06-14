"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/lib/store";
import { Check, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
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
            className={`w-full text-center text-white py-2 rounded-lg transition-colors ${
              added ? "bg-blue-800" : "bg-blue-800 hover:bg-blue-700"
            }`}
          >
            {added ? (
              <p className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5" />
                Added
              </p>
            ) : (
              <p className="flex items-center gap-2 justify-center">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
