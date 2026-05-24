"use client";

import { orderTypesUserSide } from "@/apptypes/types";
import { ChevronDownIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Order = ({ order }: { order: orderTypesUserSide }) => {
  const [showItems, setShowItems] = useState(false);
  return (
    <article className="w-full h-fit flex flex-col p-4 bg-white/10 border border-white/10 rounded-lg overflow-hidden">
      <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
        <h2 className="text-white font-semibold">Full Name:</h2>
        <h2 className="text-white font-medium">{order.userName}</h2>
      </div>
      <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-start gap-2.5">
        <h2 className="text-white font-semibold">Phone Number:</h2>
        <div className="text-white font-normal border-b border-dashed border-white/60 flex flex-row items-center justify-center gap-1.5 flex-nowrap">
          <Phone size={16} />
          {order.userPhone}
        </div>
      </div>
      {order.email && order.email.length > 0 && (
        <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-start gap-2.5">
          <h2 className="text-white font-semibold">Email:</h2>
          <div className="text-white font-normal border-b border-dashed border-white/60 flex flex-row items-center justify-center gap-1.5 flex-nowrap">
            <Mail size={16} /> {order.email.toLowerCase()}
          </div>
        </div>
      )}
      <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
        <h2 className="text-white font-semibold">Ordered:</h2>
        <h2 className="text-white font-medium">{order.item.length} items</h2>
      </div>
      <div className="w-full h-fit flex flex-col ">
        <div
          onClick={() => setShowItems((pre) => !pre)}
          className="w-full h-fit flex flex-nowrap items-center justify-between gap-2.5"
        >
          <h2 className="text-white font-semibold">Show Items:</h2>
          <h2
            className={`text-white font-medium ${showItems ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out`}
          >
            <ChevronDownIcon size={16} />
          </h2>
        </div>
        {showItems && (
          <div className="w-full h-fit flex flex-col gap-1.5 py-1.5">
            {order.item.map((ele) => (
              <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-start gap-1.5 border border-white/10 bg-white/8 rounded-md p-2.5 relative">
                <span className="w-fit h-fit px-1.5 py-1 rounded-md bg-white/5 border border-white/10 text-green-200 top-1/2 right-2 absolute">
                  {ele.type}
                </span>
                <Image
                  src={
                    "https://res.cloudinary.com/dtjszaypd/image/upload/v1776047269/nutirution%20Products/kj08ckbf78ik4wrhpmj1.webp"
                  }
                  className="rounded-md border border-white/40"
                  width={60}
                  height={60}
                  alt={ele.name}
                />
                <div className="w-full h-fit flex flex-col items-start">
                  <h2 className="text-white font-semibold">{ele.name}</h2>
                  <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-start gap-1.5">
                    <h2 className="text-white font-semibold text-sm">
                      Quantity:
                    </h2>
                    <h2 className="text-white font-medium text-sm">
                      {ele.quantity}
                    </h2>
                  </div>
                  <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-start gap-1.5">
                    <h2 className="text-white font-semibold text-sm">Price:</h2>
                    <h2 className="text-white font-medium text-sm">
                      {ele.price} DA
                    </h2>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        )}
        <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
          <h2 className="text-white font-semibold">Wialaya:</h2>
          <h2 className="text-white font-medium">{order.wilaya}</h2>
        </div>
        <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
          <h2 className="text-white font-semibold">Baladya:</h2>
          <h2 className="text-white font-medium">{order.baladya}</h2>
        </div>
        <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
          <h2 className="text-white font-semibold">Order Status:</h2>
          <h2
            className={`font-medium ${order.status === "pending" ? "text-blue-500" : "text-green-400"}`}
          >
            {order.status === "pending" ? "In Progress..." : "Done ✅"}
          </h2>
        </div>
        <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
          <h2 className="text-white font-semibold">Payement Method:</h2>
          <h2 className="text-white font-medium">{order.paymentMethod}</h2>
        </div>
        {order.promoCode && order.promoCode.length > 0 && (
          <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
            <h2 className="text-orange-200 font-semibold">USED CODE:</h2>
            <h2 className="text-green-400 font-medium">{order.promoCode}</h2>
          </div>
        )}
        <div className="w-full h-fit flex flex-nowrap items-center justify-start gap-2.5">
          <h2 className="text-white font-semibold">Total Price:</h2>
          <h2 className="text-white font-medium">
            {order.totalPrice.toFixed(2)} DA
          </h2>
        </div>
      </div>
    </article>
  );
};
