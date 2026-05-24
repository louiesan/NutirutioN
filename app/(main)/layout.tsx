import "../globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ReduxProvider from "./components/ReduxProvider";
import { Initing } from "./components/InitializeCart";
import { LoginBtn } from "./components/LoginBtn";
import Script from "next/dist/client/script";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title:
    "Nutirution Market - Your Ultimate Destination for Premium Nutrition Products",
  description:
    "Discover a wide range of high-quality nutrition products at Nutirution Market. From protein powders to vitamins, we have everything you need to fuel your fitness journey. Shop now and experience the best in nutrition!",
  keywords:
    "nutrition products, protein powders, vitamins, supplements, fitness, health, wellness, Nutirution Market",
  openGraph: {
    title:
      "Nutirution Market - Your Ultimate Destination for Premium Nutrition Products",
    description:
      "Discover a wide range of high-quality nutrition products at Nutirution Market. From protein powders to vitamins, we have everything you need to fuel your fitness journey. Shop now and experience the best in nutrition!",
    url: "https://nutirutionmarket.com",
    siteName: "Nutirution Market",
    images: [
      {
        url: "https://res.cloudinary.com/dtjszaypd/image/upload/v1778117010/log_f6eqr7.png",
        width: 1200,
        height: 630,
        alt: "Nutirution Market - Your Ultimate Destination for Premium Nutrition Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <Script id="chatbase-widget" strategy="afterInteractive">
        {`
          (function(){
            if(!window.chatbase || window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(arguments)
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){return target.q}
                  return(...args)=>target(prop,...args)
                }
              })
            }
            const onLoad=function(){
              const script=document.createElement("script");
              script.src="https://www.chatbase.co/embed.min.js";
              script.id="efGy9bj07TCQS7eIUtKdb";
              script.domain="www.chatbase.co";
              document.body.appendChild(script)
            };
            if(document.readyState==="complete"){
              onLoad()
            }else{
              window.addEventListener("load",onLoad)
            }
          })();
          `}
      </Script>
      <body
        className={`relative w-full flex flex-col min-h-screen h-full bg-linear-to-br from-[#010101] via-slate-900 to-emerald-900 mx-auto overflow-x-hidden`}
      >
        <Toaster position="top-center" />
        <ReduxProvider>
          <Initing />
          <NavBar>
            <LoginBtn />
          </NavBar>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
