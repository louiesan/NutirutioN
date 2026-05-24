import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export const LoginBtn = async () => {
  const session = await auth();
  const isLogedIn = !!session?.user;

  return (
    <>
      <li className="hidden md:inline">
        {isLogedIn ? (
          <Link className={` cursor-pointer`} href={"/profile"}>
            {session.user?.image ? (
              <Image
                width={36}
                height={36}
                className="rounded-full border border-white"
                src={session.user.image}
                alt="avatart"
              />
            ) : (
              <div className="text-xl font-bold uppercase rounded-full w-8 h-8 flex items-center justify-center bg-green-400 border border-white">
                {session.user?.name?.slice(0, 1)}
              </div>
            )}
          </Link>
        ) : (
          <Link
            href={"/auth/sign-up"}
            className="w-fit px-2.5 py-1.5 rounded-md bg-green-400 text-white font-semibold"
          >
            Sign Up
          </Link>
        )}
      </li>
      <li className="inline md:hidden">
        {isLogedIn ? (
          <Link
            className={` w-full h-fit flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-2xl font-medium border border-transparent rounded-xl px-2 py-2 hover:text-white duration-300 ease-in-out transition-all text-white/50`}
            href={"/profile"}
          >
            {session.user?.image ? (
              <>
                <Image
                  width={36}
                  height={36}
                  className="rounded-full border border-white"
                  src={session.user.image}
                  alt="avatart"
                />
                Profile
              </>
            ) : (
              <>
                ]
                <div className="text-xl font-bold uppercase rounded-full px-2.5 py-1.5 bg-green-400 border border-white">
                  {session.user?.name?.slice(0, 1)}
                </div>
                <span>Profile</span>
              </>
            )}
          </Link>
        ) : (
          <div className="w-full h-fit flex flex-row flex-nowrap items-center gap-2.5 justify-center">
            <Link
              href={"/auth/sign-in"}
              className="w-full px-2.5 py-1.5 text-xl rounded-md bg-green-400 text-white font-semibold"
            >
              Sign In
            </Link>
            <Link
              href={"/auth/sign-up"}
              className="w-full px-2.5 py-1.5 text-xl rounded-md bg-green-400 text-white font-semibold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </li>
    </>
  );
};
