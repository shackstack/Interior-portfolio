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
      className="relative group cursor-pointer  overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
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
    </div>
  );
}
