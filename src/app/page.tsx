import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems } from "@/lib/googleSheets";
import { mockPortfolioItems } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 실제 API 호출 대신 목업 데이터 사용
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">회사명</h2>
              <p>아름다운 공간을 만드는 인테리어 전문 기업</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">연락처</h2>
              <p>전화: 010-1234-5678</p>
              <p>이메일: info@company.com</p>
              <p>주소: 서울시 강남구 테헤란로 123</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} 회사명. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
