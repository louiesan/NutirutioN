"use client";
import { Montserrat } from "next/font/google";
import Logo from "@/public/nutrlogo.png";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

import { GandGlogin } from "@/app/actions/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  const [name, setName] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const style = {
    opacity: !loading ? "100%" : "40%",
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      await GandGlogin("google");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const githubLogin = async () => {
    try {
      setLoading(true);
      await GandGlogin("github");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/auth/sign-in");
      } else {
        console.log(data);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`min-h-screen w-full flex items-center justify-center p-4  ${montserrat.className}`}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Create Account
            </h2>
            <p className="text-emerald-100/80 font-medium text-sm text-center">
              Join us to start your healthy journey
            </p>
          </div>

          <div className="grid gap-3">
            {/* Full Name */}
            <div className="space-y-1">
              <label
                className="text-sm sm:text-lg font-semibold text-white/90 ml-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                className="text-sm sm:text-lg font-semibold text-white/90 ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              />
            </div>

            {/* Password Grid (Côte à côte sur tablette/PC pour gagner de la place) */}

            <div className="space-y-1.5 relative">
              <label
                className="text-sm sm:text-lg font-semibold text-white/90 ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type={!isVisible ? "password" : "text"}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setIsVisible((pre) => !pre)}
                className="absolute top-1/2 right-2  text-green-200/90 font-semibold"
              >
                {isVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && <span>{error}</span>}

          <button
            disabled={loading}
            style={style}
            className="w-full flex flex-row items-center justify-center py-3.5 mt-2 bg-green-500 hover:bg-green-400 text-slate-900 font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-wide"
          >
            {loading && (
              <span className="text-white font-medium text-lg animate-spin">
                <Loader2 />
              </span>
            )}
            Register Now
          </button>
        </form>

        {/* Séparateur */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-white/40 backdrop-blur-sm">
              Or sign up with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={googleLogin}
            style={style}
            className="text-sm sm:text-lg flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            {loading && (
              <span className="text-white font-medium text-lg animate-spin">
                <Loader2 />
              </span>
            )}
            <FaGoogle color="ff6467" /> Google
          </button>
          <button
            onClick={githubLogin}
            style={style}
            className="text-sm sm:text-lg flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            {loading && (
              <span className="text-white font-medium text-lg animate-spin">
                <Loader2 />
              </span>
            )}
            <FaGithub color="#51a2ff" /> Github
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-green-400 font-semibold hover:underline transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
