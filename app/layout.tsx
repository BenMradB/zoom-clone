import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ZOOM",
  description: "Video Calling App",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: "/images/logo.png",
          shimmer: true,
          animations: true,
          socialButtonsPlacement: "top",
        },
        variables: {
          colorText: "#f8fafc",
          colorBackground: "#0f172a",
          colorInputBackground: "#1e293b",
          colorPrimary: "#0E78F9",
        },
      }}
    >
      <html
        lang="en"
        // className="bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50"
        className="dark"
      >
        <body
          className={cn(
            "min-h-screen p-2  bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
