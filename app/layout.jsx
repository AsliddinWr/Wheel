import "./globals.css";

export const metadata = {
  title: "Premium Wheel",
  description: "Spin and win prizes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
