"use client";
import { Lato } from "next/font/google";
import { Store, Dumbbell, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { CgMenuRightAlt, CgProfile } from "react-icons/cg";
import { FaPaperclip } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import Logo from "@/public/nutrlogo.png";
import Image from "next/image";
import { useState } from "react";
import { Logout } from "@/app/actions/action";
const rubik = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

export default function ProfileBar() {
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* BIG SCREEN NAVBAR */}

      <nav
        className={`${theme === "dark" ? " bg-black/20" : "bg-black/20 drop-shadow-violet-400"} hidden z-999 fixed top-0 w-full h-fit p-2.5 backdrop-blur-xl drop-shadow-sm md:flex flex-row flex-nowrap items-center justify-between  ${rubik.className} ${rubik.style.fontStyle} font-medium`}
      >
        <div className="w-full h-full max-w-5xl mx-auto flex flex-row flex-nowrap items-center justify-between ">
          <div
            className={`${theme === "dark" && "drop-shadow-green-300/80 drop-shadow-md"} w-fit h-fit flex flex-nowrap items-center justify-center gap-1`}
          >
            <Image
              src={Logo}
              width={60}
              alt="NutritionMarketLogo"
              quality={75}
              placeholder="blur"
            />
            <h1 className="text-3xl text-white font-bold">NutirutioN</h1>
          </div>
          <ul className="w-fit h-full flex flex-nowrap items-center justify-center gap-2.5">
            <li>
              <Link
                className={`${pathname === "/profile" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/profile"}
              >
                <CgProfile size={20} />
                Personal
              </Link>
            </li>

            <li>
              <Link
                className={`${pathname === "/profile/orders" ? "text-white" : "text-white/40"} flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-xl font-medium border border-transparent rounded-xl px-2 py-1 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/profile/orders"}
              >
                <FaPaperclip size={20} />
                Orders
              </Link>
            </li>
          </ul>
          <ul className="w-fit h-full flex flex-nowrap items-center justify-center gap-2.5">
            <li>
              <Link
                href={"/markets"}
                className="w-fit px-2.5 py-1.5 flex flex-nowrap items-center justify-center gap-1.5 rounded-md bg-transparent border border-white/20 hover:border-green-300 hover:text-green-300 duration-300 transition-all ease-in text-white font-semibold"
              >
                <Store size={20} />
                Shop
              </Link>
            </li>
            <li>
              <button
                onClick={Logout}
                className="w-fit px-2.5 py-1.5 flex flex-nowrap items-center justify-center gap-1.5 rounded-md bg-white/10 border border-white/30 hover:border-red-300 hover:text-red-300 duration-300 transition-all ease-in text-white font-semibold"
              >
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* SMALL SCREEN NAVBAR */}
      <nav
        className={`${theme === "dark" ? " bg-black/20" : "bg-black/20 drop-shadow-violet-400"} flex z-999 fixed top-0 w-full h-fit p-2.5 backdrop-blur-xl drop-shadow-sm md:hidden flex-row flex-nowrap items-center justify-between  ${rubik.className} ${rubik.style.fontStyle} font-medium`}
      >
        <div
          className={`${theme === "dark" && "drop-shadow-green-300/80 drop-shadow-md"} w-fit h-fit flex flex-nowrap items-center justify-center gap-1`}
        >
          <Image
            src={Logo}
            width={60}
            alt="NutritionMarketLogo"
            quality={75}
            placeholder="blur"
          />
          <h1 className="text-3xl text-white font-bold">NutirutioN</h1>
        </div>
        <div className="w-fit h-fit flex flex-nowrap flex-row items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen((pre) => !pre)}
            className="w-fit h-fit cursor-pointer"
          >
            <CgMenuRightAlt size={30} color="white" />
          </button>
        </div>
        <div
          className={`${mobileMenuOpen ? "left-0" : "left-full"} ${rubik.className} ${rubik.style.fontStyle} fixed top-18 z-999 w-full h-screen bg-black/80 p-2.5 backdrop-blur-xl duration-500 ease-in-out transition-all`}
        >
          <ul className="w-full h-fit flex flex-col items-start gap-1.5 mb-2.5">
            <li>
              <Link
                className={`${pathname === "/profile" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/profile"}
              >
                <CgProfile size={20} />
                Personal
              </Link>
            </li>

            <li>
              <Link
                className={`${pathname === "/profile/orders" ? "text-white" : "text-white/40"} flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-xl font-medium border border-transparent rounded-xl px-2 py-1 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/profile/orders"}
              >
                <FaPaperclip size={20} />
                Orders
              </Link>
            </li>
          </ul>
          <div className="w-full h-fit flex flex-row flex-nowrap items-center gap-2.5 justify-center">
            <Link
              href={"/markets"}
              className="w-full px-2.5 py-1.5 flex flex-nowrap items-center justify-center gap-1.5 rounded-md bg-transparent border border-white/20 hover:border-green-300 hover:text-green-300 duration-300 transition-all ease-in text-white font-semibold"
            >
              <Store size={20} />
              Shop
            </Link>
            <button
              onClick={Logout}
              className="w-full px-2.5 py-1.5 flex flex-nowrap items-center justify-center gap-1.5 rounded-md bg-white/10 border border-white/30 hover:border-red-300 hover:text-red-300 duration-300 transition-all ease-in text-white font-semibold"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
