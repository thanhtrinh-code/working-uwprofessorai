import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UW Professor AI",
  description: "Help UW students understand what other student say about professor",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
