import { google } from "googleapis";

export interface PortfolioImage {
  url: string;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  images: PortfolioImage[];
  description: string;
  category: string;
  date: string;
  order: number;
}

export interface ContactFormData {
  name: string;
  email?: string;
  phone: string;
  inquiryType: string;
  message: string;
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Portfolio!A2:J"; // A2부터 J열까지 (헤더 제외)

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row) => {
      // 이미지 URL들 (쉼표로 구분된 문자열)과 설명들 (세미콜론으로 구분된 문자열)
      const imageUrls = (row[3] || "")
        .split(",")
        .map((url: string) => url.trim());
      const imageDescriptions = (row[4] || "")
        .split(";")
        .map((desc: string) => desc.trim());

      const images: PortfolioImage[] = imageUrls.map(
        (url: string, index: number) => ({
          url,
          description: imageDescriptions[index] || undefined,
        })
      );

      return {
        id: row[0],
        title: row[1] || "",
        images: images.length ? images : [{ url: "" }],
        description: row[2] || "",
        category: row[5] || "",
        date: row[6] || "",
        order: parseInt(row[7]) || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}

export async function addContactFormData(
  data: ContactFormData
): Promise<boolean> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Contact!A:F"; // Contact 시트의 A부터 F열까지

    // 현재 날짜 및 시간 생성
    const now = new Date();
    const formattedDate = now.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    // 시트에 추가할 데이터
    const values = [
      [
        formattedDate,
        data.name,
        data.email || "",
        data.phone,
        data.inquiryType,
        data.message,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding contact form data:", error);
    return false;
  }
}
