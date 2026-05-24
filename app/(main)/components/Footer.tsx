import Link from "next/link";
import Logo from "@/public/nutrlogo.png";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const appLinks = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/about", label: "About" },
  { href: "/goals", label: "Goals" },
];

export default function Footer() {
  return (
    <footer className=" border-t border-white/10 bg-black/30 px-4 py-10 backdrop-blur-xl  mt-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
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
            <h2 className="text-3xl font-black tracking-wide text-white">
              NutirutioN
            </h2>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70 sm:text-base">
            Healthy shopping made simple with quick access to meals, bundles,
            and market essentials.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            App Links
          </h3>
          <ul className="mt-4 space-y-3 text-sm sm:text-base">
            {appLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75 sm:text-base">
            <Link
              href="tel:+15552489012"
              className="flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Phone size={16} />
              <span>+1 (555) 248-9012</span>
            </Link>
            <Link
              href="mailto:hello@nutirutionapp.com"
              className="flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Mail size={16} />
              <span>hello@nutirutionapp.com</span>
            </Link>
            <li className="flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer">
              <MapPin size={16} />
              <span>28 Cedar Lane, Brooklyn, NY</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full flex-col gap-2 border-t border-white/10 pt-4 max-w-6xl text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 NutirutioN. All rights reserved.</p>
        <p className="italic hover:text-green-400 duration-300 ease-in-out transition-all">
          <q>Built for a cleaner grocery and nutrition experience.</q>
        </p>
      </div>
    </footer>
  );
}
