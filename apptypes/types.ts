export type searchparam = {
  query: string;
  category: string;
  minprice: string;
  maxprice: string;
};

export type item = {
  itemId: string;
  name: string;
  images: imageObj[];
  price: number;
  discount?: number;
  quantity: number;
};

export type cart = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  bundle?: item[];
  isBundle: boolean;
};
export type goal = {
  id: number;
  name: string;
  slug: string;
  price: number;
  categoryIds: number[];
  description: string;
  highlights: string[];
  productIds: number[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Categories = Category[];

type imageObj = {
  url: string;
  public_id: string;
  _id?: string;
};

export type product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  shortDescription: string;
  images: imageObj[];
  stock: number;
};

export type NutritionFacts = {
  servingSize: string;
  servingsPerContainer: string;
  protein: string;
  carbs: string;
  fat: string;
  calories: number;
};

export type LongDescriptionSection = {
  title: string;
  content: string;
};

export type LongDescription = {
  intro: string;
  sections: LongDescriptionSection[];
  conclusion: string;
};

export type ProductById = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;

  price: number;
  stock: number;

  rating?: number;
  reviewsCount?: number;

  images: imageObj[];
  badges: string[];

  shortDescription: string;
  highlights: string[];

  longDescription: LongDescription;

  nutritionFacts: NutritionFacts;

  ingredients: string[];
  featured: {
    isFeatured?: boolean;
    order?: number | string;
  };
};

// CREATING ORDER TYPES SO WE CAN HANDLE IT IN THE FRONT END WITHOUT MAKING TYPESCRIPT SAD :(
type bundleItems = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type orderProduct = {
  type: string;
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  // bundleId?: string;
  // bundleItems?: bundleItems[];
};

export type orderTypeAdminSide = {
  _id: string;
  userId?: string;
  userPhone: string;
  userName: string;
  email: string;
  wilaya: string;
  baladya: string;
  promoCode?: string;
  userAdress?: string;
  item: orderProduct[];
  totalPrice: number;
  status: string;
  deliveryMethod: string;
  paymentMethod: string;
  shipping: number | null;
};
export type orderTypesUserSide = {
  userId?: string;
  userPhone: string;
  userName: string;
  email: string;
  wilaya: string;
  baladya: string;
  promoCode?: string;
  userAdress?: string;
  item: orderProduct[];
  totalPrice: number;
  status: string;
  deliveryMethod: string;
  paymentMethod: string;
  shipping: number | null;
};

export type user = {
  image?: string;
  email: string;
  name: string;
  role: string;
  _id: "69e2b4d9bd73faf7b1695520";
};
export type users = user[];

export type promocode = {
  _id: string;
  promoCode: string;
  discountPercentage: number;
  expiresAt: string;
  usageLimits: number;
  usedCount: number;
};
