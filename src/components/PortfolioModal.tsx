"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/lib/googleSheets";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    // 모달이 열릴 때마다 첫 번째 이미지로 리셋
    setActiveIndex(0);
  }, [item]);

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

        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="mySwiper"
          >
            {item.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={image.url}
                    alt={`${item.title} 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {image.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                      <p className="text-sm">{image.description}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
