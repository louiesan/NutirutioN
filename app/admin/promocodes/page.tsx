import { Suspense } from "react";
import { CodeMang } from "./components/CodeMang";
import { PromoWrapper } from "./components/PromoWrapper";
import { CodeLoading } from "./components/CodeLoading";
import { apiUrl } from "@/lib/siteUrl";

export default async function page() {
  const res = await fetch(apiUrl("/api/promocodes"));

  const data = await res.json();

  const promocodes = data;
  console.log(promocodes);

  return (
    <main className="w-full h-fit relative">
      <h2 className="text-white font-semibold text-2xl  ms:text-4xl capitalize mb-10">
        Promo Codes Manager:
      </h2>
      <CodeMang />
      <Suspense fallback={<CodeLoading />}>
        <PromoWrapper promocodes={promocodes} />
      </Suspense>
    </main>
  );
}
