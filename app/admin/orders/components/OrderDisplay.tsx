import { orderTypeAdminSide } from "@/apptypes/types";
import { Order } from "./Order";

export const OrderDisplay = ({ orders }: { orders: orderTypeAdminSide[] }) => {
  return orders.map((order, id) => <Order key={id} order={order} />);
};
