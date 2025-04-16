"use client";

import { useState } from "react";

interface ContactFormProps {
  onClose?: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      inquiryType: formData.get("inquiryType") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "문의 제출 중 오류가 발생했습니다.");
      }

      setFormStatus("success");
      // 폼 리셋
      e.currentTarget.reset();
    } catch (error) {
      console.error("문의 제출 오류:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "문의 제출 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-1 md:p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">문의하기</h2>

      {formStatus === "success" ? (
        <div className="text-center mb-6">
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
            문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.
          </div>
          <button
            onClick={onClose}
            className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition"
          >
            닫기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              연락처
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="010-1234-5678"
            />
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-gray-700 mb-2">
              문의 유형
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="견적문의">견적 문의</option>
              <option value="상담문의">상담 문의</option>
              <option value="협업문의">협업 문의</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="문의 내용을 입력해주세요."
            ></textarea>
          </div>

          {formStatus === "error" && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-3 mt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition flex-1"
              >
                취소
              </button>
            )}
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className={`bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition flex-1 ${
                formStatus === "submitting"
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {formStatus === "submitting" ? "제출 중..." : "문의하기"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
