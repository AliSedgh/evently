import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

import MuiTheme from "../providers/MuiTheme";
import ReactQueryClient from "@/providers/ReactQueryClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
          <ReactQueryClient>
            <MuiTheme>{children}</MuiTheme>
          </ReactQueryClient>
        </ClerkProvider>
      </body>
    </html>
  );
}
