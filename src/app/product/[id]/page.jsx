"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Products } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store";
import NotFound from "@/app/not-found";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const product = Products.find((p) => p.id == params.id);

  if (!product) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
      setAdded(true);

      setTimeout(() => {
        setAdded(false);
        router.push("/cart");
      }, 1500);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="container mx-auto py-8 px-2">
      <button
        onClick={() => {
          router.back();
        }}
        className="mb-6 lg:ml-5 flex items-center gap-2 text-blue-600 font-montserrat-medium hover:text-blue-800 cursor-pointer"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="h-[300px] sm:h-[350px] lg:h-[400px] relative overflow-hidden rounded-lg bg-white flex items-center justify-center">
            <Image
              width={300}
              height={300}
              src={product.image}
              alt={product.title}
              className="object-contain"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews}reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-4">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-2 border-x border-gray-300 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
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
          </button>
        </div>
      </div>
    </div>
  );
}
