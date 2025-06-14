import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "WBS - WhatBytes Store",
  description: "Modern e-commerce store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-montserrat-regular flex flex-col min-h-screen justify-between">
        <div>
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
