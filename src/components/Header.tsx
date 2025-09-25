"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";
import Image from "next/image";

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <Link
                href="/"
                className="text-xl md:text-2xl font-light text-gray-600"
              >
                송 디자인
              </Link>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-gray-800 rounded-full py-2 px-4 "
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
