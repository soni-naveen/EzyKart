import React from "react";

export default function Sidebar({ filters, onFiltersChange }) {
  const categories = ["All", "Electronics", "Clothing", "Home"];
  return (
    <div className="bg-blue-800 text-white p-6 rounded-xl">
      <h3 className="text-xl font-montserrat-medium mb-4">Filters</h3>
      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-montserrat-medium mb-3">Category</h4>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-2">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={(e) =>
                onFiltersChange({ ...filters, category: e.target.value })
              }
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
            value={filters.maxPrice}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxPrice: parseInt(e.target.value),
              })
            }
            className="w-full accent-sky-400"
          />
          <div className="flex justify-between text-sm">
            <span>$0</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
