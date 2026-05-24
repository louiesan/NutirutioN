"use client";
import AlgeriaWilaya from "@/data/Wilaya_Of_Algeria.json";
import card from "@/public/credit.webp";
import on_delivery from "@/public/ondelivery.webp";
import house from "@/public/house.webp";
import office_building from "@/public/office-building.webp";
import AlgeriaCommunes from "@/data/Commune_Of_Algeria.json";
import { useContext } from "react";
import { Info } from "lucide-react";
import Image from "next/image";
import { CheckoutContext } from "../context/checkoutcontext";

export default function PayForm() {
  const { selectedWilaya, order, handleChange, isFieldFilled } =
    useContext(CheckoutContext);

  const cardClass =
    "w-full h-fit flex flex-col gap-4 rounded-3xl border border-white/15 bg-black/25 p-4 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-6";
  const labelClass =
    "text-sm font-semibold uppercase tracking-[0.16em] text-white/85";
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2.5 text-base text-white outline-none transition-all duration-200 placeholder:text-white/35 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25";
  const optionCard =
    "w-full h-full px-2.5 py-3 flex flex-col items-center justify-center gap-1.5 rounded-2xl border cursor-pointer transition-all duration-300 ease-in";

  return (
    <div className="w-full h-fit flex flex-col gap-5 md:sticky md:top-20">
      <form className={cardClass}>
        <h4 className="text-white font-semibold text-2xl mb-1.5">
          Customer details
        </h4>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="fullname" className={labelClass}>
            Full Name:<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="userName"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={order.userName}
            placeholder="Full Name"
            className={inputClass}
          />
          {isFieldFilled && !(order.userName.length > 4) && (
            <span className="text-red-200 font-medium text-sm my-1">
              Please Enter a valid Name
            </span>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label
            htmlFor="email"
            className={`${labelClass} flex flex-row items-center justify-between relative`}
          >
            Email Adress:
            <span className="bg-white/20 text-white rounded-full text-xs peer p-1">
              <Info size={16} />
            </span>
            <span className="absolute select-none top-full left-4/5 -translate-y-1/4 -translate-x-1/2 invisible peer-hover:visible peer-active:visible peer-active:opacity-100 opacity-0 peer-hover:opacity-100 w-44 h-fit text-xs bg-black/70 border border-white/10 text-white/80 p-2 rounded-md transition-all duration-300 ease-in backdrop-blur-md">
              Add your email address so we can notify you when you're ordre is
              accepted!
            </span>
          </label>
          <input
            type="text"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={order.email}
            name="email"
            placeholder="blingalinga@example.com"
            className={inputClass}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="mobile" className={labelClass}>
            Mobile Number:<span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="userPhone"
            value={order.userPhone}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="+213 557 88 43 72"
            className={inputClass}
          />
          {isFieldFilled && !(order.userPhone.length > 9) && (
            <span className="text-red-200 font-medium text-sm my-1">
              Please Enter a valid Phone Number!
            </span>
          )}
        </div>
        <div className="w-full h-fit grid grid-cols-2 gap-2.5 pt-1">
          <h4
            className={`${labelClass} flex flex-row items-center justify-between relative col-span-2`}
          >
            Delivery Method:
          </h4>
          <div
            onClick={(e) => {
              handleChange("deliveryMethod", "home");
            }}
            className={`${optionCard} ${order.deliveryMethod === "home" ? "bg-emerald-400/10 border-emerald-300/75" : "border-white/20 hover:border-emerald-300/70 hover:bg-white/5"}`}
          >
            <Image src={house} alt="home" width={50} height={50} className="" />
            <h5 className="text-white font-bold text-lg text-center">Home</h5>
          </div>
          <div
            onClick={(e) => {
              handleChange("deliveryMethod", "pick-up");
            }}
            className={`${optionCard} ${order.deliveryMethod === "pick-up" ? "bg-emerald-400/10 border-emerald-300/75" : "border-white/20 hover:border-emerald-300/70 hover:bg-white/5"}`}
          >
            <Image
              src={office_building}
              alt="credit_card"
              width={50}
              height={50}
              className=""
            />
            <h5 className="text-white font-bold text-lg text-center">
              Pick Up
            </h5>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="wilaya" className={labelClass}>
            Select Your Wilaya:<span className="text-red-400">*</span>
          </label>
          <select
            required
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            className={inputClass}
            name="wilaya"
            value={order.wilaya}
            id=""
          >
            <option className="text-white" value="">
              Select Your Wilaya
            </option>
            {AlgeriaWilaya.map((ele) => (
              <option
                key={`${ele.id}-${ele.name}`}
                onClick={() => handleChange("shipping", ele.ship)}
                className="uppercase px-2.5 hover:bg-slate-900 text-white py-2.5 border-y border-black flex flex-row flex-nowrap items-center justify-start"
                value={ele.name}
              >
                <span className="font-semibold text-wite">{ele.id}</span>{" "}
                {ele.name}
              </option>
            ))}
          </select>
          {isFieldFilled && !(order.wilaya.length > 4) && (
            <span className="text-red-200 font-medium text-sm my-1">
              Please Enter a valid Wilaya
            </span>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="communes" className={labelClass}>
            Select Your Baladya:<span className="text-red-400">*</span>
          </label>
          <select
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
            value={order.baladya}
            disabled={order.wilaya === ""}
            className={`${inputClass} disabled:opacity-50`}
            name="baladya"
          >
            {order.wilaya !== "" && (
              <>
                <option className="text-white" value="">
                  Select Your Wilaya
                </option>
                {order.wilaya &&
                  AlgeriaCommunes.map(
                    (ele) =>
                      AlgeriaWilaya[selectedWilaya]?.id === ele.wilaya_id && (
                        <option
                          key={`${ele.wilaya_id}-${ele.name}`}
                          className="uppercase px-2.5 hover:bg-slate-900 text-white py-2.5 border-y border-black flex flex-row flex-nowrap items-center justify-start"
                          value={ele.name}
                        >
                          {" "}
                          {ele.name}
                        </option>
                      ),
                  )}
              </>
            )}
          </select>
          {isFieldFilled && !(order.baladya.length > 4) && (
            <span className="text-red-200 font-medium text-sm my-1">
              Please Enter a valid Baladya!
            </span>
          )}
        </div>
        {order.deliveryMethod === "home" ? (
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="fullname" className={labelClass}>
              Home Adress:<span className="text-red-400">*</span>
            </label>
            <textarea
              name="userAdress"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Home Address"
              className={`${inputClass} min-h-26 resize-y`}
            />
            {isFieldFilled && !((order.userAdress?.length ?? 0) > 9) && (
              <span className="text-red-200 font-medium text-sm my-1">
                Please Enter a valid Home Address!
              </span>
            )}
          </div>
        ) : null}
      </form>
      {/* <div className={cardClass}>
        <h4 className="text-white font-semibold text-2xl mb-1.5">
          Payment method
        </h4>
        <div className="w-full h-fit grid grid-cols-2 gap-2.5">
          <div
            onClick={() => {
              handleChange("paymentMethod", "Hand-to-Hand");
            }}
            className={`${optionCard} ${order.paymentMethod === "Hand-to-Hand" ? "bg-emerald-400/10 border-emerald-300/75" : "border-white/20 hover:border-emerald-300/70 hover:bg-white/5"}`}
          >
            <Image
              src={on_delivery}
              alt="onDelivery"
              width={50}
              height={50}
              className=""
            />
            <h5 className="text-white font-bold text-lg text-center">
              On Delivery
            </h5>
          </div>
          <div
            onClick={() => {
              handleChange("paymentMethod", "Cart");
            }}
            className={`${optionCard} ${order.paymentMethod === "Cart" ? "bg-emerald-400/10 border-emerald-300/75" : "border-white/20 hover:border-emerald-300/70 hover:bg-white/5"}`}
          >
            <Image
              src={card}
              alt="credit_card"
              width={50}
              height={50}
              className=""
            />
            <h5 className="text-white font-bold text-lg text-center">
              Credit Card
            </h5>
          </div>
        </div>
        {order.paymentMethod === "Cart" ? (
          <div className="w-full h-fit flex flex-col gap-2.5 text-white">
            <div>
              <label className={labelClass} htmlFor="cardName">
                Full Name :
              </label>
              <input
                type="text"
                placeholder="First&Last Name..."
                name="cardName"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cardNum">
                Card Number:
              </label>
              <input
                type="text"
                name="cardNum"
                placeholder="0000 0000 0000 0000"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="w-full h-full flex flex-col gap-1.5 ">
                <label className={labelClass} htmlFor="expires">
                  Expires
                </label>
                <input
                  type="month"
                  name="expires"
                  placeholder="0000 0000 0000 0000"
                  className={inputClass}
                />
              </div>
              <div className="w-full h-full flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="cvv">
                  CVV:
                </label>
                <input type="text" maxLength={3} className={inputClass} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 text-white items-center justify-center">
            <h2 className="capitalize font-medium text-2xl">
              Payment Method: On Delivery
            </h2>
            <p className="text-white font-semibold text-lg ">
              You will pay upon delivery.
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}
