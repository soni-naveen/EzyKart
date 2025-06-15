"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Slider from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import { X } from "lucide-react";

function SidebarContent({ isOpen, onClose }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Furniture",
    "Fitness",
    "Accessories",
  ];

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
    (values) => {
      const [min, max] = values;

      // Enforce minimum gap of 10 and prevent crossover
      const clampedMin = Math.min(min, priceRange[1] - 10);
      const clampedMax = Math.max(max, priceRange[0] + 10);

      const newRange = [clampedMin, clampedMax];

      setPriceRange(newRange);
      updateURL(selectedCategories, newRange);
    },
    [priceRange, selectedCategories, updateURL]
  );
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
            fixed inset-y-0 lg:inset-auto left-0 z-50 w-80 shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none lg:shadow-none lg:w-56 xl:w-70
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
          <div className="mb-2">
            <h4 className="font-montserrat-medium">Price</h4>
            <div className="space-y-2">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              >
                <Slider.Track className="bg-gray-300 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-sky-500 rounded-full h-full" />
                </Slider.Track>
                {priceRange.map((_, i) => (
                  <Slider.Thumb
                    key={i}
                    className="block w-5 h-5 bg-white border-2 border-sky-500 rounded-full shadow transition-all focus:outline-none focus:ring focus:ring-sky-300"
                  />
                ))}
              </Slider.Root>
              <div className="flex justify-between text-sm mt-2">
                <motion.span
                  key={priceRange[0]}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white"
                >
                  ${priceRange[0]}
                </motion.span>
                <motion.span
                  key={priceRange[1]}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white"
                >
                  ${priceRange[1]}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarSkeleton() {
  return <>Loading...</>;
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent isOpen={isOpen} onClose={onClose} />
    </Suspense>
  );
}
