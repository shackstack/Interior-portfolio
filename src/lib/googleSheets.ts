import { google } from "googleapis";

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  date: string;
  order: number;
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
    const range = "Portfolio!A2:G"; // A2부터 G열까지 (헤더 제외)

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row, idx) => ({
      id: idx.toString(),
      title: row[0] || "",
      imageUrl: row[1] || "",
      description: row[2] || "",
      category: row[3] || "",
      date: row[4] || "",
      order: parseInt(row[5]) || 0,
    }));
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}
