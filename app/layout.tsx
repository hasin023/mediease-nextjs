import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediEase",
  description:
    "MediEase is a platform that helps you manage your health records, appointments and prescriptions in one place. It also helps you keep track of your payment history and insurance claims.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
