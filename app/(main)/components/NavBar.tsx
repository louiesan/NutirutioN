"use client";
import { Lato } from "next/font/google";
import { Store, Dumbbell, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaPaperclip } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import Logo from "@/public/nutrlogo.png";
import Image from "next/image";
import { useState } from "react";
import { useAppSelector } from "@/redux/appstore/storeHooks/storeHooks";
import { LoginBtn } from "./LoginBtn";

const rubik = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

export default function NavBar({ children }: { children: React.ReactNode }) {
  const cartItems = useAppSelector((state) => state.cartSlice.cart.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* BIG SCREEN NAVBAR */}

      <nav
        className={`bg-black/20 hidden z-999 fixed top-0 w-full h-fit p-2.5 backdrop-blur-xl drop-shadow-sm md:flex flex-row flex-nowrap items-center justify-between  ${rubik.className} ${rubik.style.fontStyle} font-medium`}
      >
        <div className="w-full h-full max-w-5xl mx-auto flex flex-row flex-nowrap items-center justify-between ">
          <div
            className={`drop-shadow-green-300/80 drop-shadow-md w-fit h-fit flex flex-nowrap items-center justify-center gap-1`}
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
                className={`${pathname === "/" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/"}
              >
                <Dumbbell size={20} />
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname?.startsWith("/markets") ? "text-white" : "text-white/40"} flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-xl font-medium border border-transparent rounded-xl px-2 py-1 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/markets"}
              >
                <Store size={20} />
                Markets
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname === "/about" ? "text-white" : "text-white/40"} flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-xl font-medium border border-transparent rounded-xl px-2 py-1 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/about"}
              >
                <FaPaperclip size={20} />
                About
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname === "/goals" ? "text-white" : "text-white/40"} flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-xl font-medium border border-transparent rounded-xl px-2 py-1 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/goals"}
              >
                <Package size={20} />
                Goals
              </Link>
            </li>
          </ul>
          <ul className="w-fit h-full flex flex-nowrap items-center justify-center gap-2.5">
            <li>
              <Link className="relative" href={"/cart"}>
                <ShoppingBasket
                  size={30}
                  className="text-white cursor-pointer"
                />
                <span className="w-4 h-4 absolute bottom-0 right-0 text-xs bg-amber-300 rounded-full text-center">
                  {cartItems}
                </span>
              </Link>
            </li>
            {children}
          </ul>
        </div>
      </nav>
      {/* SMALL SCREEN NAVBAR */}
      <nav
        className={` bg-black/20 flex z-999 fixed top-0 w-full h-fit p-2.5 backdrop-blur-xl drop-shadow-sm md:hidden flex-row flex-nowrap items-center justify-between  ${rubik.className} ${rubik.style.fontStyle} font-medium`}
      >
        <div
          className={`drop-shadow-green-300/80 drop-shadow-md w-fit h-fit flex flex-nowrap items-center justify-center gap-1`}
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
          <Link className="relative" href={"/cart"}>
            <ShoppingBasket size={30} className="text-white cursor-pointer" />
            <span className="w-4 h-4 absolute bottom-0 right-0 text-xs text-white bg-amber-300 rounded-full text-center">
              {cartItems}
            </span>
          </Link>
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
                onClick={() => setMobileMenuOpen(false)}
                className={`${pathname === "/" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/"}
              >
                <Dumbbell size={25} />
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                className={`${pathname === "/markets" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/markets"}
              >
                <Store size={25} />
                Markets
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                className={`${pathname === "/about" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/about"}
              >
                <FaPaperclip size={25} />
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                className={`${pathname === "/goals" ? "text-white" : "text-white/40"} w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all`}
                href={"/goals"}
              >
                <GoGoal size={25} />
                Goals
              </Link>
            </li>
            {children}
          </ul>
        </div>
      </nav>
    </>
  );
}
