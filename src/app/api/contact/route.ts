import { NextRequest, NextResponse } from "next/server";
import { addContactFormData, ContactFormData } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, message } = body;

    // 필수 필드 검증
    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 문의 데이터를 스프레드시트에 추가
    const formData: ContactFormData = {
      name,
      email,
      phone: phone || "연락처 없음",
      inquiryType: inquiryType || "기타",
      message,
    };

    const success = await addContactFormData(formData);

    if (!success) {
      throw new Error("스프레드시트에 데이터 추가 실패");
    }

    // 로그 남기기
    console.log("문의 접수 및 스프레드시트 저장 완료:", formData);

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message:
          "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("문의 처리 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
