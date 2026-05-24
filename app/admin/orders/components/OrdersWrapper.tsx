"use client";
import { orderTypeAdminSide } from "@/apptypes/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import { OrderDisplay } from "./OrderDisplay";

export const OrdersWrapper = ({ orders }: { orders: orderTypeAdminSide[] }) => {
  const pathname = useSearchParams();
  const query = pathname?.get("query") || "";
  const searchedOrders = orders.filter(
    (ele) =>
      ele.email.toLowerCase().includes(query.toLowerCase()) ||
      ele.userName.toLowerCase().includes(query.toLowerCase()),
  );
  const condition = searchedOrders.every((e) => orders.includes(e));

  return (
    <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 mt-5">
      <OrderDisplay orders={condition ? searchedOrders : orders} />
    </div>
  );
};
