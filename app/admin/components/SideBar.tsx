"use client";
import {
  LayoutDashboard,
  UsersIcon,
  Package,
  BoxesIcon,
  Ticket,
  LucidePanelTopBottomDashed,
  LogOut,
  Sparkles,
} from "lucide-react";
import { MdMenuOpen } from "react-icons/md";

import Logo from "@/public/nutrlogo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminContext } from "../context/adminContext";
import { useContext } from "react";
import { Logout } from "@/app/actions/action";

export default function SideBar() {
  const pathname = usePathname();
  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Goals",
      href: "/admin/goals",
      icon: Sparkles,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: UsersIcon,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: LucidePanelTopBottomDashed,
    },

    {
      name: "Promo Codes",
      href: "/admin/promocodes",
      icon: Ticket,
    },
  ];

  const { setOpenMenu, openMenu } = useContext(adminContext);

  return (
    <>
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="w-full h-full fixed z-950 bg-slate-950/70"
        />
      )}
      <div
        className={`w-64 min-h-screen bg-zinc-950 mg:hidden absolute top-0 ${!openMenu ? "-left-full" : "left-0"} z-999 duration-300 ease-in-out transition-all`}
      >
        <button
          onClick={() => setOpenMenu(false)}
          className="text-white font-semibold text-xl cursor-pointer absolute top-5 right-5"
        >
          <MdMenuOpen size={28} />
        </button>
        <h1 className="text-3xl text-white font-bold mt-5 mb-10 mx-auto w-fit">
          Admin
        </h1>
        <ul className="w-full h-fit flex flex-col justify-center items-start gap-2.5 p-2.5">
          {links.map((ele, index) => (
            <li
              key={index}
              className={`w-full h-full p-2.5 text-white/90 font-bold flex flex-nowrap items-center gap-2.5 rounded-md ${pathname === ele.href ? "bg-green-500 text-white" : "bg-transparent hover:bg-zinc-500/40"} text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              <ele.icon size={20} />
              <Link href={ele.href}>{ele.name}</Link>
            </li>
          ))}
          <button className="w-full mt-10 p-2.5 self-end text-white/90 font-bold flex flex-nowrap items-center gap-2.5 rounded-md bg-transparent hover:text-red-400 capitalize hover:bg-zinc-500/40 text-lg cursor-pointer transition-all duration-300 ease-in-out">
            <LogOut size={20} />
            Logout
          </button>
        </ul>
      </div>
      <div className="relative ">
        <div className="w-64 fixed min-h-screen bg-zinc-950 mg:block hidden border-r border-r-zinc-500/40 p-2.5 duration-300 ease-in-out transition-all">
          <h1 className="text-3xl text-white font-bold mt-5 mb-10 mx-auto w-fit">
            Admin
          </h1>
          <ul className="w-full h-fit flex flex-col justify-center items-start gap-2.5 p-2.5">
            {links.map((ele, index) => (
              <li
                key={index}
                className={`w-full h-full p-2.5 text-white/90 font-bold flex flex-nowrap items-center gap-2.5 rounded-md ${pathname === ele.href ? "bg-green-500 text-white" : "bg-transparent hover:bg-zinc-500/40"} text-lg cursor-pointer transition-all duration-300 ease-in-out`}
              >
                <ele.icon size={20} />
                <Link href={ele.href}>{ele.name}</Link>
              </li>
            ))}
            <button
              onClick={() => Logout()}
              className="w-full mt-10 p-2.5 self-end text-white/90 font-bold flex flex-nowrap items-center gap-2.5 rounded-md bg-transparent hover:text-red-400 capitalize hover:bg-zinc-500/40 text-lg cursor-pointer transition-all duration-300 ease-in-out"
            >
              <LogOut size={20} />
              Logout
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}
