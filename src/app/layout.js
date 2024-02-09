import { Inter } from "next/font/google";
import "../styles/globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import ContextProvider from "@/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kalibre.ai",
  description: "kalibre.ai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <SuperTokenInitialaize /> */}
        <ThemeRegistry>
          <ContextProvider>{children}</ContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
