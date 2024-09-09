import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "FluxStore",
  description: "A simple e-commerce store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
