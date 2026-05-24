import { user } from "@/apptypes/types";
import React, { useContext } from "react";
import { adminContext } from "../../context/adminContext";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { SiMinutemailer } from "react-icons/si";
import Link from "next/link";

export const UserComp = ({ user }: { user: user }) => {
  const { deleteUser, delLoading } = useContext(adminContext);
  return (
    <article className="w-full h-fit rounded-md bg-white/5 border border-white/10 flex flex-col p-2.5 relative">
      <div
        className={`${user.role === "admin" ? "text-green-400/60 italic" : "text-white/70 "} bg-white/5 rounded-lg border border-white/10 text-xs font-medium absolute top-2.5 right-2.5 px-2.5 py-1.5  `}
      >
        {user.role}
      </div>
      <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-start gap-2.5">
        {user.image && user.image.length > 0 ? (
          <Image
            src={user.image}
            width={30}
            height={30}
            alt="avatar"
            className="w-fit rounded-full border border-white"
          />
        ) : (
          <div className="w-7.5 h-7.5 rounded-full bg-green-400/80 border border-white flex items-center justify-center text-lg uppercase font-medium">
            {user.name.at(0)}
          </div>
        )}
        <div className="w-fit h-fit flex flex-col gap-1 justify-start items-start">
          <h2 className="text-white font-medium capitalize text-lg">
            {user.name}
          </h2>
          <p className="text-white/80 font-medium text-[10px] border-dashed border-white/60 pb-0.5">
            {user.email}
          </p>
        </div>
      </div>
      <div className="w-full h-fit grid grid-cols-[1fr_40px] items-center justify-start mt-2 gap-1.5">
        <button
          onClick={() => deleteUser(user._id)}
          disabled={user.role === "admin" || delLoading}
          className={` ${user.role === "admin" || delLoading ? "bg-gray-500 cursor-not-allowed" : "text-white bg-red-300 hover:bg-red-500"} font-medium py-1 px-2.5 rounded-md transition-colors duration-300 cursor-pointer flex flex-row flex-nww
         items-center justify-center gap-2.5 flex-1`}
        >
          Remove{" "}
          {delLoading && (
            <span className="text-white animate-spin">
              <Loader2 size={25} />
            </span>
          )}
        </button>
        <Link
          href={`mailto:${user.email}`}
          title="Send Email"
          className="w-full h-full p-1 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white cursor-pointer font-medium"
        >
          <SiMinutemailer size={20} />
        </Link>
      </div>
    </article>
  );
};

{
  /*      */
}
