"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ContactForm from "./ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // 모달이 열릴 때 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      // 모달이 닫힐 때 스크롤 복원
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        </button>

        <div className="p-6">
          <ContactForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
