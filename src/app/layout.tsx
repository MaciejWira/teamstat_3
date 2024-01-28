import type { Metadata } from "next";
import "@/styles/globals.scss";
import Container from "@/components/server/Container";
import Header from "@/components/server/Header";

import style from "./Layout.module.scss";

export const metadata: Metadata = {
  title: "Teamstat",
  description: "Manage stats of your team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className={style.Main}>
          <Header />
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
