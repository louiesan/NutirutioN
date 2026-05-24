import { auth } from "@/auth";
import Link from "next/link";
import { headers } from "next/headers";
import { HeartPlusIcon, Pen } from "lucide-react";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { apiUrl } from "@/lib/siteUrl";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default async function page() {
  const session = await auth();
  if (session?.user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  const id = session?.user?.id;
  console.log(session);

  const res = await fetch(apiUrl(`/api/users/${id}`), {
    headers: await headers(),
  });
  console.log(res);

  const data = await res.json();
  const userDetails = data[0];
  console.log(userDetails);

  return (
    <main
      className={`w-full h-full mt-18.5 flex flex-col max-w-6xl mx-auto flex-1 p-2.5 ${poppins.className}`}
    >
      <h2
        className={`text-white font-semibold text-3xl ${poppins.className} py-2.5`}
      >
        You're Personal Info's :
      </h2>
      <div className="w-full h-full bg-white/5 rounded-lg md:p-5 p-2.5 backdrop-blur-lg border border-green-400/40 shadow-lg shadow-black">
        <div className="w-fit h-fit flex flex-row items-center justify-center gap-2.5">
          <h2
            className={`text-white font-semibold text-2xl ${poppins.className}`}
          >
            Name :
          </h2>
        </div>
        <span className="text-white/80 font-medium text-base ">
          {userDetails.name}
        </span>
        <h2
          className={`text-white font-semibold text-2xl mt-5 ${poppins.className}`}
        >
          Email :
        </h2>
        <div className="w-fit h-fit flex flex-row mb-5">
          <span className="text-white/80 font-medium 2.5 text-base">
            {userDetails.email}
          </span>
        </div>
        {userDetails.provider && userDetails.provider.length > 0 ? (
          <div className="w-full h-full flex flex-nowrap flex-row items-center gap-1.5 mb-5">
            <h4
              className={`text-white font-semibold text-2xl ${poppins.className}`}
            >
              Your Account Linked with:
            </h4>
            {userDetails.provider &&
              userDetails.provider.map(
                (ele: { name: string; providerId: string }, i: number) => (
                  <div
                    key={i}
                    className="w-fit h-fit flex flex-row flex-nowrap items-center justify-center gap-1 text-white rounded-full bg-white/40 py-1 px-2.5"
                  >
                    {ele.name === "google" && (
                      <img
                        className="w-6 h-6"
                        src="data:image/png;base64,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"
                        alt="google-logo"
                      />
                    )}
                    {ele.name === "github" && (
                      <img
                        src="data:image/png;base64,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"
                        alt="github"
                      />
                    )}
                    <span>{ele?.name}</span>
                  </div>
                ),
              )}
          </div>
        ) : null}
        <h2
          className={`text-white font-semibold text-center text-2xl ${poppins.className}`}
        >
          Your Account Properties:
        </h2>
        <div className="w-full h-full grid grid-cols-1 gap-5 p-2.5">
          <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-slate-950/40 border border-white/40 rounded-md p-2.5">
            <h4 className="text-white font-black text-2xl capitalize">
              Your Orders:
            </h4>
            {userDetails.orders && userDetails.orders > 0 ? (
              <>
                <p className="text-white/80 text-4xl font-semibold">
                  {userDetails.orders}
                </p>{" "}
                <Link
                  href="/profile/orders"
                  className="bg-transparent w-fit h-fit text-lg border border-white/50 hover:bg-slate-900/70 hover:text-green-400 text-white font-bold py-2 px-4 rounded-md duration-300 transition-all"
                >
                  GO Check Orders
                </Link>
              </>
            ) : (
              <>
                <p className="text-white/80 font-medium text-lg ">
                  You did not order anything yet!
                </p>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMUlEQVR4nO2ZT0sbQRjGnxaMF4vHQqEWLW1OIsGYLVSpWGlz8OwX8NCTxOIH6LVZT9pD6cFeu6ZFk9pDCwZ66h+amtgIBaOFahFBs+Iq1dC4UyZMNE3dGEx2dtqdBx4I2d3J+/5m3neHCSAlJSUlJSUlVYPuLe9cG84Y8ZFl4+fot11SjUMru0RJ6TU7kNQNJZWd8S9seh1L/v6KYVSbeNFDS0ZdAByDyOr+dPYydwDDGSNeTGpyY5+sHRySvEnIoUlIfDtnCSC4uF1XAMwR7gBG2LJ/urFPypUzzROTH/y6Y0fy1DvcAYyypFYPDv9IvnwF0Jqny96mmT+yYwDy5nHyfWl7kxQSQKm8c0vEMx4lnolo4XN5kMXrUKfOZKtxhVgBeZMUAjwONvZXkKXXzw4hJhaA+HaO/GJ170oAoyUuLPEJWgIx4p3LnFwCNUCwGlcYAIpDDVACSEkARAJwIwD/uzXie50mHbMJMQB4OW6EOt9mSEfs05GFAODhtA+gM1+avOsA+OiyFxGAl9NGiNa8cABCdTrqqsblyQsBYKjOR13/HICgzQceQgMYtO+oS1wAIU5HXcICUE4IjNdGSFgAHk77AAkgJigAL6+NkKgAFLc3QUUC0CUARQLQJQDlvwLwIOJBeCqMsLZe6zu8qlfdeJRcev6RBOa3BAGgag95JF5uCkEMAGE+M1/uhvEZawBcT4RU/skXbQXA92bR3QC63v9wNwCF6/8CYS3vGIBktiIEuhIK5TCbMG0EMLXqFADfh/Wq9gWBpL5nHwBVe+IUgNZX6eoApPRp+wCMRVqhaoYTABofvST+xOZpAHKdCb0Ftkp9dscpCM2Tc5Ug5G58zgbBRWMvrkDVHkPVvvNujI0TMdI6+6XQEwLJLaIs6HuB+ey0/TMvJSUlVVkNAJoBXARAG9J1AO0AugB0A+gB0AugD0A/gLsAaNceYA6y7/rZPb3smW42Rjsbs4X9RjP7Tcd0AcBVAAEW9IBD7mcx0FiaeCR+HoDfwYRPs5/F6GoA58BBTQDaWH06WQK3WQxtvEoAFqrUBG+yhnaLNTgatFUTpNfoPfRe+gx91tYm+BsiMU5tkjbW9wAAAABJRU5ErkJggg=="
                  alt="purchase-order"
                />{" "}
              </>
            )}
          </div>{" "}
        </div>
      </div>
    </main>
  );
}
