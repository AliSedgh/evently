import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import MuiTheme from "../providers/MuiTheme";
import MuiCacheProvider from "../providers/MuiCacheProvider";
import { log } from "console";

const func1 = () => {
  console.log("func_1");
};

const func2 = () => {
  console.log("func_2");
  func1();
};
const main = () => {
  func2();
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        <ClerkProvider>
          <MuiCacheProvider>
            <MuiTheme>{children}</MuiTheme>
          </MuiCacheProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
