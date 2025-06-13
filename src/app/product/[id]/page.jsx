"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Products } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store";
import NotFound from "@/app/not-found";

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = Products.find((p) => p.id === params.id);

  if (!product) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 border-2 border-transparent hover:border-blue-500 cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={`${product.title} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
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
                {product.rating} ({product.reviews} reviews)
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

          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Brand</h3>
            <span className="text-gray-600">{product.brand}</span>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-gray-100 transition-colors"
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
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          {/* Reviews Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {/* Sample Review */}
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">John D.</span>
                </div>
                <p className="text-gray-600">
                  Great product! Exactly as described and fast shipping.
                </p>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="ml-2 font-semibold">Sarah M.</span>
                </div>
                <p className="text-gray-600">
                  Good quality, though it took a bit longer to arrive than
                  expected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
