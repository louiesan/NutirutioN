"use client";
import { StoreIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { adminContext } from "../context/adminContext";
import Link from "next/link";

export default function Header({
  user,
}: {
  user: { name: string; image?: string };
}) {
  const { openMenu, setOpenMenu } = useContext(adminContext);

  return (
    <nav className="w-full h-fit px-2.5 py-5 flex flex-row flex-nowrap items-center justify-between">
      <button
        onClick={() => setOpenMenu(true)}
        className="block mg:hidden text-white font-semibold text-xl cursor-pointer pl-1.5"
      >
        <RiMenu2Line size={28} />
      </button>
      <div className="w-fit h-fit flex flex-row flex-nowrap items-center justify-center gap-1.5 ">
        {user.image !== "" && user.image ? (
          <Image
            className="rounded-full border border-white"
            src={user.image}
            alt="avatar"
            width={34}
            height={34}
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-white text-white bg-green-600 place-items-center place-content-center">
            {user.name.at(0)}
          </div>
        )}
        <h2 className="text-white font-medium capitalize text-xl ">
          {user.name}
        </h2>
      </div>
      <Link
        href={"/markets"}
        className="w-fit hidden mg:flex px-2.5 py-1.5 flex-nowrap items-center justify-center gap-1.5 rounded-sm bg-transparent border border-white shadow-xs shadow-white cursor-pointer hover:border-green-300 hover:text-green-300 duration-300 transition-all ease-in text-white font-semibold"
      >
        Shop <StoreIcon size={25} />
      </Link>
    </nav>
  );
}
