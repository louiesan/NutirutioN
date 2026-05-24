import { Loader2, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { apiUrl } from "@/lib/siteUrl";

export const ReviewForm = ({
  productId,
  userId,
  userName,
  onClose,
}: {
  productId: string;
  userId: string;
  userName: string;
  onClose?: () => void;
}) => {
  const [review, setReview] = useState({
    productId,
    userId,
    userName,
    comment: "",
    rate: 0,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(key: string, value: string | number) {
    setReview((pre) => ({
      ...pre,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    if (review.rate === 0 || review.comment.trim() === "") {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/reviews"), {
        method: "POST",
        body: JSON.stringify(review),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Review submitted successfully!");
        router.push(`/product/${productId}`);
        onClose?.();
      } else {
        toast.error(
          data.message ||
            "You can't have multiple reviews for the same product.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full h-full fixed top-0 left-0 z-1000 bg-slate-800/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm h-fit absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6 rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close review form"
        >
          <X size={20} className="text-slate-600" />
        </button>

        {/* Rating Section */}
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Rate your experience
          </h2>
          <div className="flex gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleChange("rate", i + 1)}
                className="p-1 hover:scale-110 transition-transform cursor-pointer"
                aria-label={`Rate ${i + 1} stars`}
              >
                <Star
                  fill={review.rate >= i + 1 ? "#fbbf24" : "transparent"}
                  color="#fbbf24"
                  size={32}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 mt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Write a review
          </h2>
          <textarea
            onChange={(e) => handleChange("comment", e.target.value)}
            value={review.comment}
            name="comment"
            placeholder="Share your thoughts about this product..."
            className="w-full h-24 p-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none resize-none text-slate-800 placeholder-slate-400"
          ></textarea>
        </div>

        <button
          onClick={async () => handleSubmit()}
          className={`${loading ? "opacity-50 pointer-events-none" : "opacity-100 pointer-events-auto"} mt-6 w-full flex items-center justify-center gap-1.5 py-3 rounded-lg text-white font-medium bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer active:scale-95`}
        >
          Submit Your Review
          {loading && <Loader2 className="animate-spin text-white" size={23} />}
        </button>
      </div>
    </div>
  );
};
