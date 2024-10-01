import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Metadata for the application.
 * @type {Object}
 */
export const metadata = {
  title: "FluxStore",
  description:
    "FluxStore is a modern, feature-rich e-commerce application built with Next.js",
};

/**
 * Root layout component for the application.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Accusoft/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Accusoft/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Accusoft/favicon-16x16.png"
        />
        <link rel="manifest" href="/Accusoft/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/Accusoft/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Navigation bar component */}
        <Navbar />
        <div className="flex-grow">
          {/* Main content area */}
          {children}
        </div>
        {/* Footer component*/}
        <Footer />
      </body>
    </html>
  );
}
