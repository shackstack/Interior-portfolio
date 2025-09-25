"use client";

import { useState } from "react";
import { PortfolioItem } from "@/lib/googleSheets";
import PortfolioCard from "./PortfolioCard";
import PortfolioModal from "./PortfolioModal";

interface PortfolioGridProps {
  portfolioItems: PortfolioItem[];
  categories: string[];
}

export default function PortfolioGrid({
  portfolioItems,
  categories,
}: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    selectedCategory === "전체"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium text-gray-800 ${
            selectedCategory === "전체" ? "font-bold underline" : "font-normal"
          }`}
          onClick={() => setSelectedCategory("전체")}
        >
          전체
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium text-gray-800 ${
              selectedCategory === category
                ? "font-bold underline"
                : "font-normal"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 포트폴리오 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            onClick={(item) => setSelectedItem(item)}
          />
        ))}
      </div>

      {/* 빈 상태 표시 */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            해당 카테고리에 포트폴리오가 없습니다.
          </p>
        </div>
      )}

      {/* 모달 */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
