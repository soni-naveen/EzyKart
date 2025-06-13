import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Shopping App - Whatbytes",
  description: "Shopping App Frontend Assignment - Whatbytes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-montserrat-regular">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
