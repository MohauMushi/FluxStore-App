import "./globals.css";

export const metadata = {
  title: "FluxStore",
  description: "A simple e-commerce store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
