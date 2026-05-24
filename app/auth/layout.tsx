import React from "react";
import "../globals.css";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative w-full flex flex-col min-h-screen h-full bg-linear-to-br from-[#010101] via-slate-900 to-emerald-900 mx-auto overflow-x-hidden">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
