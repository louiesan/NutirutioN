"use client";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LongDescription, ProductById, promocode } from "@/apptypes/types";
import toast from "react-hot-toast";

type ProductDraft = {
  images: { url: string; public_id: string }[];
  name?: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  stock?: string | number;
  shortDescription: string;
  longDescription: LongDescription;
  badges: string[];
  highlights: string[];
  ingredients: string[];
  price?: string | number;
  [key: string]: unknown;
};

type AdminContextValue = {
  DeleteOrder: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  delLoading: boolean;
  createPromocode: (promoCode: promocode) => Promise<unknown>;
  deletePromocode: (id: string) => Promise<void>;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  UpdateOrder: (id: string, status: string, item: any) => Promise<void>;
  orderLoading: boolean;
  setOrderLoading: Dispatch<SetStateAction<boolean>>;
  product: ProductDraft;
  setProduct: Dispatch<SetStateAction<ProductDraft>>;
  badges: string[];
  setBadgees: Dispatch<SetStateAction<string[]>>;
  highlight: string[];
  setHighlight: Dispatch<SetStateAction<string[]>>;
  ingredient: string[];
  setIngredient: Dispatch<SetStateAction<string[]>>;
  createProduct: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (productData: ProductById) => Promise<unknown>;
};

export const adminContext = createContext<AdminContextValue>(
  {} as AdminContextValue,
);

export default function AdminContextProvide({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [delLoading, setDelLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDraft>({} as ProductDraft);
  const [badges, setBadgees] = useState<string[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string[]>([]);

  console.log(product);

  async function deleteUser(id: string) {
    try {
      setDelLoading(true);
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin/users");
        toast.success("User Deleted!", {
          duration: 2000,
          icon: "🗑️",
        });
      }
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    } finally {
      setDelLoading(false);
    }
  }
  //  MAKE THIS IN SHAA ALLAH!
  async function createPromocode(promoCode: promocode) {
    try {
      const res = await fetch("http://localhost:3000/api/promocodes", {
        method: "POST",
        body: JSON.stringify(promoCode),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin/promocodes");
        toast.success("Promocode Created!", {
          duration: 2000,
          icon: "✅",
        });
      }
      return data;
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    }
  }

  async function deletePromocode(id: string) {
    try {
      setDelLoading(true);
      const res = await fetch(`http://localhost:3000/api/promocodes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin/promocodes");
        toast.success("Promocode Deleted!", {
          duration: 2000,
          icon: "🗑️",
        });
      }
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    } finally {
      setDelLoading(false);
    }
  }

  async function UpdateOrder(id: string, status: string, item: any) {
    try {
      setOrderLoading(true);

      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, item }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("UPDATED!");
        toast.success("Order Confirmed!", {
          duration: 2000,
          icon: "✅",
        });
        router.push("/admin/orders");
      } else {
        console.log("ACCESS DENIED!");
      }
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    } finally {
      setOrderLoading(false);
    }
  }

  async function DeleteOrder(id: string) {
    try {
      setOrderLoading(true);
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        console.log("DELETED!!");
        toast.success("Order Deleted!", {
          duration: 2000,
          icon: "🗑️",
        });
        router.push("/admin/orders");
        console.log(data);
      } else {
        console.log("ACCESS DENIED!");
      }
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    } finally {
      setOrderLoading(false);
    }
  }

  async function createProduct() {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(product),
      });
      const data = await res.json();
      toast.success("Product Created!", {
        duration: 2000,
        icon: "✅",
      });
      router.push("/admin/products");
      console.log(data);
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    }
  }

  async function deleteProduct(id: string) {
    try {
      setDelLoading(true);
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product Deleted!", {
          duration: 2000,
          icon: "🗑️",
        });
        router.push("/admin/products");
        console.log(data);
      }
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    } finally {
      setDelLoading(false);
    }
  }

  async function updateProduct(productData: ProductById) {
    console.log(productData);

    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${productData._id}`,
        {
          method: "PUT",
          body: JSON.stringify(productData),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Product Updated!", {
          duration: 2000,
          icon: "✅",
        });
        router.push("/admin/products");
      }
    } catch (err) {
      toast.error("Error Occured!!", {
        duration: 2000,
        icon: "🚨",
      });
      throw err;
    }
  }

  useEffect(() => {
    setProduct((prev) => ({ ...prev, badges }));
  }, [badges]);
  useEffect(() => {
    setProduct((prev) => ({ ...prev, highlights: highlight }));
  }, [highlight]);
  useEffect(() => {
    setProduct((prev) => ({ ...prev, ingredients: ingredient }));
  }, [ingredient]);

  return (
    <adminContext.Provider
      value={{
        DeleteOrder,
        deleteUser,
        delLoading,
        createPromocode,
        deletePromocode,
        openMenu,
        setOpenMenu,
        UpdateOrder,
        orderLoading,
        setOrderLoading,
        product,
        setProduct,
        badges,
        setBadgees,
        highlight,
        setHighlight,
        ingredient,
        setIngredient,
        deleteProduct,
        createProduct,
        updateProduct,
      }}
    >
      {children}{" "}
    </adminContext.Provider>
  );
}
