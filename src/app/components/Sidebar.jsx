"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["All", "Electronics", "Clothing", "Home"];

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    } else {
      setSelectedCategories([]);
    }

    if (minPriceParam && maxPriceParam) {
      setPriceRange([
        Number.parseInt(minPriceParam),
        Number.parseInt(maxPriceParam),
      ]);
    } else {
      setPriceRange([0, 1000]);
    }
  }, []);

  const updateURL = useCallback(
    (newCategories, newPriceRange) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newCategories.length > 0 && !newCategories.includes("All")) {
        params.set("category", newCategories.join(","));
      } else {
        params.delete("category");
      }

      if (newPriceRange[0] > 0 || newPriceRange[1] < 1000) {
        params.set("minPrice", newPriceRange[0].toString());
        params.set("maxPrice", newPriceRange[1].toString());
      } else {
        params.delete("minPrice");
        params.delete("maxPrice");
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleCategoryChange = useCallback(
    (category) => {
      let newCategories;

      if (category === "All") {
        newCategories = [];
      } else {
        if (selectedCategories.includes(category)) {
          newCategories = selectedCategories.filter((c) => c !== category);
        } else {
          newCategories = [
            ...selectedCategories.filter((c) => c !== "All"),
            category,
          ];
        }
      }

      setSelectedCategories(newCategories);
      updateURL(newCategories, priceRange);
    },
    [selectedCategories, priceRange, updateURL]
  );

  const handlePriceChange = useCallback(
    (e) => {
      const value = Number.parseInt(e.target.value);
      const newPriceRange = [priceRange[0], value];
      setPriceRange(newPriceRange);
      updateURL(selectedCategories, newPriceRange);
    },
    [selectedCategories, priceRange, updateURL]
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
            fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none lg:shadow-none lg:w-56 xl:w-70
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="bg-blue-800 text-white p-6 lg:rounded-xl h-full overflow-y-auto">
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-montserrat-medium mb-3">Category</h4>
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="category"
                  checked={
                    category === "All"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(category)
                  }
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-montserrat-medium mb-3">Price</h4>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full accent-sky-400"
              />
              <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
