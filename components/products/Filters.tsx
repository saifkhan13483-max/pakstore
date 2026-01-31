"use client"

import { Input } from "@/components/ui/input"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const CATEGORIES = ["Electronics", "Fashion", "Home Goods", "Accessories"]
const PRICE_RANGES = [
  { label: "Under Rs. 1,000", value: "0-1000" },
  { label: "Rs. 1,000 - 3,000", value: "1000-3000" },
  { label: "Rs. 3,000 - 5,000", value: "3000-5000" },
  { label: "Rs. 5,000 - 10,000", value: "5000-10000" },
  { label: "Over Rs. 10,000", value: "10000-plus" },
]

export function Filters() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </h2>
        <button className="text-xs text-primary hover:underline font-medium">Clear All</button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary transition-colors cursor-pointer" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-sm">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="price" className="w-4 h-4 border-slate-300 text-primary focus:ring-primary transition-colors cursor-pointer" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{range.label}</span>
            </label>
          ))}
        </div>
        <div className="pt-2 flex items-center gap-2">
          <Input placeholder="Min" className="h-8 text-xs" />
          <span className="text-slate-400">-</span>
          <Input placeholder="Max" className="h-8 text-xs" />
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-sm">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary transition-colors cursor-pointer" />
            <span className="text-sm text-slate-600 group-hover:text-slate-900">In Stock</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-sm">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary transition-colors cursor-pointer" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{rating} Stars & Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}