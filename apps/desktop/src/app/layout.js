import "./globals.css";

export const metadata = {
  title: "LUZA",
  description: "Futuristic AI desktop assistant"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
