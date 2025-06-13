import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Shopping App - Whatbytes",
  description: "Shopping App Frontend Assignment - Whatbytes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-montserrat-regular">
        {children}
        <Footer />
      </body>
    </html>
  );
}
