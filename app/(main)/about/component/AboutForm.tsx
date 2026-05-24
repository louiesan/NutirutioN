"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AboutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_x5lg5x2",
        "template_oegld1x",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "-dPaWrYa7O-Dzh3zd",
      );

      toast.success("Message sent successfully.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("email send error:", err);
      toast.error("Failed to send your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    // Initialize EmailJS once on client to ensure proper behavior
    try {
      // the SDK accepts init(publicKey) or passing publicKey to send;
      // calling init improves reliability in some environments
      // @ts-ignore
      if (emailjs && typeof emailjs.init === "function") {
        // public key from existing usage
        // @ts-ignore
        emailjs.init("gDtqi3Ixf7W4sahZZ");
      }
    } catch (e) {
      // ignore init errors
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-green-400/40 transition"
    >
      <label
        className="text-white text-lg font-medium capitalize"
        htmlFor="name"
      >
        Full Name: <span>*</span>
      </label>
      <input
        className="w-full h-fit outline-0 peer px-2.5 py-1 rounded-md bg-white text-gray-900 font-normal border border-black mb-1.5"
        id="name"
        name="name"
        type="text"
        placeholder="Hdaydi Ostora"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label
        className="text-white text-lg font-medium capitalize"
        htmlFor="email"
      >
        Email: <span>*</span>
      </label>
      <input
        className="w-full h-fit outline-0 peer px-2.5 py-1 rounded-md bg-white text-gray-900 font-normal border border-black mb-1.5"
        id="email"
        name="email"
        type="email"
        placeholder="shesthebest@beloved.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label
        className="text-white text-lg font-medium capitalize"
        htmlFor="message"
      >
        Message: <span>*</span>
      </label>
      <textarea
        placeholder="type your message here..."
        className="w-full h-fit outline-0 peer px-2.5 py-1 rounded-md bg-white text-gray-900 font-normal border border-black"
        id="message"
        name="message"
        cols={3}
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className={
          "w-full h-10 rounded-md font-medium text-black cursor-pointer bg-white my-1.5 flex items-center justify-center " +
          (isSubmitting ? "opacity-70 pointer-events-none" : "")
        }
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin mr-2 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            SENDING...
          </>
        ) : (
          "SUBMIT"
        )}
      </button>
    </form>
  );
};
