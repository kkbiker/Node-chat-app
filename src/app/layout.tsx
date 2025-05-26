import type { Metadata } from "next";
import "./globals.css";

import { NavProvider } from "@/context/Header/NavContext";
import { Header } from "@/component/header/header";

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
        <NavProvider>
          <Header />
          {children}
        </NavProvider>
      </body>
    </html>
  );
}
