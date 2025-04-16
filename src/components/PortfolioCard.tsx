"use client";

import Image from "next/image";
import { PortfolioItem } from "@/lib/googleSheets";

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export default function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  return (
    <div
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      onClick={() => onClick(item)}
    >
      <div className="aspect-square relative">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold truncate">{item.title}</h3>
        <p className="text-sm text-gray-200">{item.category}</p>
      </div>
    </div>
  );
}
