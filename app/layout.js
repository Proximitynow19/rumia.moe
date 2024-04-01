import { Roboto_Serif } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Serif({ subsets: ["latin"] });

export const metadata = {
  title: "Jakob",
  description: "Software Engineering Student from New Zealand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
