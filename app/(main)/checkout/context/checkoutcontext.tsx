"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { cart, orderTypesUserSide } from "@/apptypes/types";
import { useAppSelector } from "@/redux/appstore/storeHooks/storeHooks";
import { useSession } from "next-auth/react";
import AlgeriaWilaya from "@/data/Wilaya_Of_Algeria.json";
import AlgeriaCommunes from "@/data/Commune_Of_Algeria.json";
import { set } from "mongoose";
import { redirect } from "next/navigation";
import { apiUrl } from "@/lib/siteUrl";

type checkoutContextType = {
  cart: cart[];
  order: orderTypesUserSide;
  setOrder: Dispatch<SetStateAction<orderTypesUserSide>>;
  setShipping: Dispatch<SetStateAction<Number | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedWilaya: number;
  price: number;
  handleChange: (key: string, value: string | number | cart[]) => void;
  isFieldFilled: boolean;
  handlePlaceOrder: () => Promise<void>;
  handleGetPromoCode: (promo: string) => Promise<any>;
  promoDis: number;
  isCode: string;
};

export const CheckoutContext = createContext<checkoutContextType>(
  {} as checkoutContextType,
);

export default function CheckoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useAppSelector((state) => state.cartSlice.cart);
  const price = useAppSelector((state) => state.cartSlice.price);
  const [selectedWilaya, setSelectedWilaya] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [promoDis, setPromoDis] = useState<number>(0);
  const [isFieldFilled, setIsFieldFilled] = useState<boolean>(false);
  const [order, setOrder] = useState({
    userId: "",
    userPhone: "",
    userName: "",
    email: "",
    wilaya: "",
    baladya: "",
    userAdress: "",
    promoCode: "",
    item: [],
    totalPrice: price,
    shipping: null,
    status: "pending",
    deliveryMethod: "home",
    paymentMethod: "Hand-to-Hand",
  } as orderTypesUserSide);
  const [isCode, setIsCode] = useState<string>("");
  const [shipping, setShipping] = useState<Number | null>(null);
  const { data, status } = useSession();

  const handleGetPromoCode = async (promo: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/promocodes/${promo.toUpperCase()}`, {
        method: "GET",
      });
      const data = await res.json();
      const promoOb = data[0];
      if (promoOb && Object.keys(promoOb).length > 0) {
        const currentDate = new Date().getTime();
        const expiresData = new Date(promoOb.expiresAt).getTime();
        if (
          promoOb.usageLimits > promoOb.usedCount &&
          expiresData > currentDate
        ) {
          setPromoDis(promoOb.discountPercentage);
          setIsCode(``);
          handleChange("promoCode", promo.toUpperCase());
        } else {
          setPromoDis(0);
          handleChange("promoCode", "");
          setIsCode(`${promo} has expired or exceed the limit usage!`);
        }
      } else {
        setPromoDis(0);
        handleChange("promoCode", "");
        setIsCode(`${promo} is not a valid code!`);
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  async function handlePlaceOrder() {
    const { userName, userPhone, wilaya, baladya } = order;
    if (
      !(userName.length > 5) ||
      !(userPhone.length > 9) ||
      !(wilaya.length > 4) ||
      !(baladya.length > 4)
    ) {
      setIsFieldFilled(true);
      return;
    }
    if (order.deliveryMethod === "home" && order.userAdress?.length! < 10) {
      setIsFieldFilled(true);
      return;
    }
    setIsFieldFilled(false);
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/orders"), {
        method: "POST",
        body: JSON.stringify(order),
      });
      const data = await res.json();

      if (res.ok) {
        window.localStorage.clear();
        if (status === "authenticated") {
          redirect("/profile");
        } else {
          redirect("/markets");
        }
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function handleChange(key: string, value: string | number | cart[]) {
    setOrder((pre) => ({
      ...pre,
      [key]: value,
    }));
  }

  useEffect(() => {
    handleChange("item", cart);
  }, []);

  useEffect(() => {
    const selectedWilaya = AlgeriaWilaya.findIndex(
      (ele) => ele.name === order.wilaya,
    );
    setSelectedWilaya(selectedWilaya);
    handleChange("baladya", "");
  }, [order.wilaya]);

  useEffect(() => {
    if (status === "authenticated") {
      handleChange("userName", data?.user?.name ? data.user.name : "");
      handleChange("userId", data?.user?.id ? data.user.id : "");
      handleChange("email", data?.user?.email ? data.user.email : "");
    }
  }, [status]);

  useEffect(() => {
    let orderPrice = price;
    if (promoDis && promoDis > 0) {
      orderPrice = orderPrice - (promoDis * price) / 100;
    }

    if (order.shipping && Number(order.shipping) > 0) {
      orderPrice = orderPrice + Number(order.shipping);
    }

    setOrder((pre) => ({
      ...pre,
      totalPrice: orderPrice,
    }));
  }, [promoDis, order.shipping]);

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        order,
        setOrder,
        setShipping,
        setLoading,
        loading,
        selectedWilaya,
        price,
        handleChange,
        isFieldFilled,
        handlePlaceOrder,
        handleGetPromoCode,
        promoDis,
        isCode,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
