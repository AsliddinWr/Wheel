import "./globals.css";

export const metadata = {
  title: "Premium Wheel",
  description: "Premium casino wheel"
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
