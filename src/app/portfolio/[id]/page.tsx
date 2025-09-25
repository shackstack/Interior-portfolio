"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { PortfolioItem } from "@/lib/googleSheets";

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        const response = await fetch(`/api/portfolio/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("포트폴리오 데이터를 가져오는데 실패했습니다:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPortfolioItem();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">포트폴리오를 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-2/3 mx-auto py-8">
      {/* 포트폴리오 정보 */}
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* 이미지 */}
      <div className="flex gap-8 flex-col items-center py-8">
        {item.images.map((image, index) => (
          <div className="relative w-full aspect-[4/3]" key={image.url}>
            <Image
              src={image.url}
              alt={`${item.title} 이미지 ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
