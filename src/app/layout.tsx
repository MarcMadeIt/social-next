import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAMA",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
        variables: {
          colorPrimary: "#5eead4",
          colorText: "#5eead4",
          colorTextSecondary: "#ccfbf1",
          colorBackground: "#111",
          colorInputBackground: "#171717",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <div className="">
            <Topbar />
          </div>
          <div className="px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-20 mb-24">
            {children}
          </div>
          <div className="md:hidden">
            <Navbar />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
