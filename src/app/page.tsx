import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems } from "@/lib/googleSheets";
import { mockPortfolioItems } from "@/lib/mockData";
// import { mockPortfolioItems } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 실제 API 호출 사용
  const portfolioItems = await getPortfolioItems();
  // const portfolioItems = mockPortfolioItems;

  // 중복 없는 카테고리 목록 추출
  const categories = [...new Set(portfolioItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            인테리어 포트폴리오
          </h1>
          <p className="text-gray-500 text-center mt-2">
            고객의 공간을 아름답게 디자인합니다
          </p>
        </div>
      </header>

      <main>
        <PortfolioGrid
          portfolioItems={portfolioItems}
          categories={categories}
        />
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} 회사명. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
