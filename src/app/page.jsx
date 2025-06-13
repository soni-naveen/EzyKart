"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Products } from "./utils/data";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    maxPrice: 1000,
  });

  const filteredProducts = Products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filters.category === "All" || product.category === filters.category;
    const matchesPrice = product.price <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-montserrat-bold mb-6">
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
