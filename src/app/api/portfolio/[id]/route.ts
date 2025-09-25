import { NextRequest, NextResponse } from "next/server";
import { getPortfolioItems } from "@/lib/googleSheets";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const portfolioItems = await getPortfolioItems();
    const item = portfolioItems.find(async (item) => item.id === id);

    if (!item) {
      return NextResponse.json(
        { error: "포트폴리오를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("포트폴리오 데이터를 가져오는데 실패했습니다:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
