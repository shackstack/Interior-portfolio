import MapSection from "@/components/MapSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 실제 API 호출 사용
  const portfolioItems = await getPortfolioItems();
  // const portfolioItems = mockPortfolioItems;

  // 중복 없는 카테고리 목록 추출
  const categories = [...new Set(portfolioItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full h-[80vh] overflow-hidden">
        <img
          src={portfolioItems[0].images[0].url}
          alt="main"
          className="w-full object-cover h-[80vh] hover:scale-102 transition-all duration-300"
        />
      </div>
      <div className="py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">포트폴리오</h1>
        <p className="text-gray-500 mt-2">
          고객의 공간을 아름답게 디자인합니다
        </p>
      </div>

      <main className="flex-grow">
        <PortfolioGrid
          portfolioItems={portfolioItems}
          categories={categories}
        />
      </main>

      {/* 카카오지도 섹션 */}
      <MapSection />
    </div>
  );
}
