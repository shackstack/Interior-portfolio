"use client";

import { useEffect } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/lib/googleSheets";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        </button>

        <div className="relative w-full aspect-[4/3]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            <span>{item.category}</span>
            <span>{item.date}</span>
          </div>
          <p className="text-gray-700 whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
