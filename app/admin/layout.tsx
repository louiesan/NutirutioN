import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SideBar from "./components/SideBar";
import "../globals.css";
// removed unused imports: Menu, Image, Logo
import Header from "./components/Header";
import AdminContextProvide from "./context/adminContext";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/auth/sign-in");
  }

  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`relative w-full flex mg:grid grid-cols-[255px_1fr] min-h-screen h-full bg-[linear-gradient(180deg,#02001df7,#060611fc_70%)] mx-auto overflow-x-hidden`}
      >
        <AdminContextProvide>
          <Toaster position="top-center" />

          <SideBar />

          <div className=" flex flex-col w-full h-full relative ">
            <Header
              user={{
                name: session.user.name || "Admin",
                image: session.user.image || undefined,
              }}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto w-full max-w-350 ">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 shadow-xl backdrop-blur-md">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </AdminContextProvide>
      </body>
    </html>
  );
}
