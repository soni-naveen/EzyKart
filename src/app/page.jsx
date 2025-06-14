"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Products } from "./lib/data";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = useSearchParams();

  const filteredProducts = useMemo(() => {
    let filtered = [...Products];

    // Search filter
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    const categoryFilter = searchParams.get("category");
    if (categoryFilter) {
      const categories = categoryFilter.split(",");
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Brand filter
    const brandFilter = searchParams.get("brand");
    if (brandFilter) {
      const brands = brandFilter.split(",");
      filtered = filtered.filter((product) => brands.includes(product.brand));
    }

    // Price filter
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (product) =>
          product.price >= Number.parseInt(minPrice) &&
          product.price <= Number.parseInt(maxPrice)
      );
    }

    return filtered;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h1 className="text-lg sm:text-xl font-montserrat-medium">Product Listing</h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="text-sm sm:text-base">Filters</span>
              </button>
            </div>
            <h2 className="hidden lg:block text-2xl font-montserrat-medium mb-6">
              Product Listing
            </h2>
            {filteredProducts.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No products found matching your criteria.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="cursor-pointer">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
