import type { Metadata } from "next";
import "@/styles/globals.scss";
import Container from "@/components/server/Container";

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
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
