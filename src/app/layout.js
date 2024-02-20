import { Inter } from "next/font/google";
import "../styles/globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import ContextProvider from "@/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Join BiggWorks: Careers in Product Engineering & Digital Acceleration ",
  description: "Explore exciting careers at BiggWorks: Join a dynamic team driving innovation in Product Engineering & Digital Acceleration. Start your journey with us today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <SuperTokenInitialaize /> */}
        <ThemeRegistry>
          <ContextProvider>
            {children}
          </ContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
