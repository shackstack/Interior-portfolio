"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">회사명</h2>
              <p>아름다운 공간을 만드는 인테리어 전문 기업</p>
            </div>

            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">연락처</h2>
              <p>전화: 010-1234-5678</p>
              <p>이메일: info@company.com</p>
              <p>주소: 서울시 강남구 테헤란로 123</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">문의하기</h2>
              <p className="mb-4">
                궁금한 사항이나 견적을 원하시면 언제든지 문의해주세요.
              </p>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-white text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
              >
                문의하기
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} 회사명. All rights reserved.
          </div>
        </div>
      </footer>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
