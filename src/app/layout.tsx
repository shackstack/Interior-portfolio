import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const suit = localFont({
  src: "./SUIT-Variable.woff2",
  variable: "--font-suit",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "인테리어 포트폴리오",
  description: "고객의 공간을 아름답게 디자인하는 인테리어 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suit.className} antialiased`}>{children}</body>
    </html>
  );
}
