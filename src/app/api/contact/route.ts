import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, inquiryType, message } = body;

    // 필수 필드 검증
    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 여기에서 실제 이메일 전송 로직을 구현합니다.
    // 예시: nodemailer, AWS SES, 또는 다른 이메일 API 사용

    // 실제 구현에서는 이메일 발송 코드가 들어갈 자리
    console.log("문의 접수:", { name, phone, inquiryType, message });

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
