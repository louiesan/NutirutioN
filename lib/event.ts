import { EventEmitter } from "node:events";
import emailjs from "@emailjs/nodejs";

export const serverEvents = new EventEmitter();

serverEvents.on("orderConfirmed", notifyUser);

function notifyUser(orderDetails: any) {
  let destination = "";

  if (orderDetails.method === "delivery") {
    destination = `${orderDetails.destination}`;
  } else {
    destination = `Pickup at ${orderDetails.destination}, at Yalidine`;
  }

  emailjs.send(
    "service_p8sejri",
    "template_dmzxa6c",
    {
      order_username: orderDetails.username,
      destination: destination,
      order_price: `${orderDetails.price} DA`,
      email: orderDetails.email,
    },
    {
      privateKey: "zR4hQPGdU1kbq4_AdoMFN",
      publicKey: "gDtqi3Ixf7W4sahZZ",
    },
  );
}
