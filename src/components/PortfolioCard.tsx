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
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-3">
        <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
      </div>

      <div className="aspect-square relative">
        <Image
          src={item.images[0].url}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <p className="text-sm text-gray-200">{item.category}</p>
        <div className="mt-1 flex gap-1">
          {item.images.length > 1 && (
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
              +{item.images.length - 1}장의 사진
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
