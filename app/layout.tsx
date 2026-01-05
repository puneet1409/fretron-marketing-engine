import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fretron Move-as-One Command Center",
  description: "Interactive demo showcasing the Move-as-One Command Center and Value Studio for Fretron TMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
