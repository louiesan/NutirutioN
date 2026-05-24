import ProfileBar from "./components/ProfileBar";

import "../globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`relative w-full flex flex-col min-h-screen h-full bg-linear-to-br from-[#010101] via-slate-900 to-emerald-900 mx-auto overflow-x-hidden`}
      >
        <ProfileBar />
        {children}
      </body>
    </html>
  );
}
