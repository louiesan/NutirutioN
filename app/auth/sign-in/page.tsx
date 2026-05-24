"use client";

import { Montserrat } from "next/font/google";
import Logo from "@/public/nutrlogo.png";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { CredentialsLogin, GandGlogin } from "@/app/actions/action";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const style = {
    opacity: !loading ? "100%" : "40%",
  };
  console.log({ password, email });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      await CredentialsLogin({ email, password });
      setError("");
      router.push("/profile");
    } catch (err) {
      setError("Invalid Credentials!");
      toast.error("Invalid email or password. Please try again.");
      console.log(err, "from sign-in");
      throw err;
    } finally {
      setLoading(false);
    }
  }
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

  return (
    <main
      className={`min-h-screen w-full flex items-center justify-center p-4 ${montserrat.className}`}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              width={90}
              height={90}
              className="drop-shadow-lg"
            />
            <h2 className="text-3xl font-bold text-white tracking-tight uppercase mt-2">
              Welcome Back
            </h2>
            <p className="text-emerald-100/80 font-medium text-sm text-center">
              Enter your information to access your dashboard
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <label
                className="text-sm sm:text-lg font-semibold text-white/90 ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

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
                onClick={() => setIsVisible((pre) => !pre)}
                type="button"
                className="absolute top-1/2 right-2  text-green-200/90 font-semibold"
              >
                {isVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex items-center gap-2 text-white/80 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-white/10 accent-green-500"
              />
              Remember me
            </label>
            <Link
              href="/"
              className="text-emerald-300 hover:text-emerald-100 transition-colors font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            style={style}
            disabled={loading}
            className=" w-full flex flex-row flex-nowrap items-center justify-center gap-2 py-3.5 bg-green-500/80 hover:bg-green-400 cursor-pointer text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] uppercase tracking-wide"
          >
            {loading && (
              <span className="text-white font-medium text-lg animate-spin">
                <Loader2 />
              </span>
            )}
            Login
          </button>
        </form>
        {error && (
          <p className="text-center text-red-300 font-semibold text-xl pt-5">
            {error}
          </p>
        )}

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-white/40 backdrop-blur-sm">
              Or continue with
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

        <p className="mt-8 text-center text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-green-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
