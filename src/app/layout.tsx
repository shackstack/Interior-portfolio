import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const suit = localFont({
  src: "./SUIT-Variable.woff2",
  variable: "--font-suit",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "송 디자인",
  description: "쾌적한 생활공간을 만드는 송디자인 입니다.",
  openGraph: {
    title: "송 디자인",
    description: "쾌적한 생활공간을 만드는 송디자인 입니다.",
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suit.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
