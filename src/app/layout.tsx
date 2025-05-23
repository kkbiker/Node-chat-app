import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Node chat app",
  description: "Node.jsで初めて作ったリアルタイムチャットアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
