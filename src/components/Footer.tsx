"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <footer className="py-8 bg-gray-50 text-gray-600  border-t border-gray-700 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-semibold mb-4">회사명</h2>
              <p>송 디자인</p>
            </div>

            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-semibold mb-4">연락처</h2>
              <p>전화: 010-1234-5678</p>
              <p>이메일: info@company.com</p>
              <p>주소: 서울 광진구 뚝섬로 657 1층</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">문의하기</h2>
              <p
                className="mb-4 underline cursor-pointer"
                onClick={() => setIsContactModalOpen(true)}
              >
                궁금한 사항이나 견적을 원하시면 언제든지 문의해주세요.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} 송 디자인. All rights reserved.
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
