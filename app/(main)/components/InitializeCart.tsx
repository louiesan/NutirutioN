"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/appstore/storeHooks/storeHooks";
import { initializeCart } from "@/redux/appstore/cartSlice/cartSlice";
export const Initing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, []);
  return <></>;
};
