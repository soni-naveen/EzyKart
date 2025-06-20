"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Products } from "./lib/data";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";

function HomeContent() {
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const firstLoad = sessionStorage.getItem("firstLoad");

    if (!firstLoad) {
      setLoading(true);
      sessionStorage.setItem("firstLoad", "true");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {loading ? (
        <div className="grid place-items-center h-screen inset-0 z-100 fixed bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
          <div className="flex flex-col items-center justify-center">
            <span className="font-montserrat-bold text-3xl text-blue-800 pb-2">
              EzyKart
            </span>
            <span className="text-xl text-blue-700">Shop Smart, Shop Ezy</span>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto px-1 xs:px-4 pt-2 pb-10 lg:pt-8 lg:pb-10">
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
                  <h1 className="text-xl sm:text-2xl font-montserrat-medium">
                    Product Listing
                  </h1>
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
      )}
    </>
  );
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 pt-2 pb-10 lg:pt-8 lg:pb-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="hidden lg:block h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm p-4 animate-pulse"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
