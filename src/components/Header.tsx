"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold">
              인테리어 포트폴리오
            </Link>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gray-800 text-white rounded-full py-2 px-4 hover:bg-gray-700 transition-colors"
              >
                문의하기
              </button>
            </nav>
          </div>
        </div>
      </header>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
