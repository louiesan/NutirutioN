"use client";

import { reviewsSchemaInterface } from "@/lib/models/Reviews";
import { Star, StarHalf } from "lucide-react";
import { useState } from "react";
import { ReviewForm } from "./ReviewForm";
import Link from "next/link";

export const ReviewsMang = ({
  reviews,
  totalRating,
  reviewCount,
  productId,
  user,
}: {
  reviews: reviewsSchemaInterface[];
  totalRating: number;
  reviewCount: number;
  productId: string;
  user: {
    id: string;
    userName: string;
  };
}) => {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  console.log(reviews);
  return (
    <>
      {openReviewForm && (
        <ReviewForm
          userName={user.userName || ""}
          productId={productId}
          userId={user.id}
          onClose={() => setOpenReviewForm(false)}
        />
      )}
      <section className="border-t border-white/10 pt-10 flex flex-col gap-5">
        <h2 className="text-2xl sm:text-4xl mg:text-5xl text-center font-semibold mb-6">
          Customer Reviews
        </h2>
        <div className="w-full h-fit flex flex-row flex-wrap sm:flex-nowrap my-5 items-center justify-center sm:justify-between px-2.5 gap-5">
          <div className="w-fit h-fit flex flex-row flex-nowrap items-center justify-center bg-slate-950 p-4 rounded-lg ">
            <div className="w-fit h-fit flex flex-row flex-nowrap items-center justify-center">
              <h2 className="text-5xl font-bold text-white">
                {totalRating.toFixed(1)}
              </h2>
            </div>
            <div className="w-fit flex flex-col items-start justify-center gap-0.5">
              <p className="w-fit flex flex-row items-center gap-0.5 justify-center">
                {" "}
                {totalRating === 0 ? (
                  [...Array(5)].map((_, i) => (
                    <Star key={i} size={15} color="white" />
                  ))
                ) : totalRating % 1 === 0 ? (
                  [...Array(totalRating)].map((_, i) => (
                    <Star key={i} size={15} color="yellow" fill="yellow" />
                  ))
                ) : (
                  <>
                    {[...Array(Math.floor(totalRating))].map((_, i) => (
                      <Star key={i} size={15} color="yellow" fill="yellow" />
                    ))}
                    <StarHalf size={15} color="yellow" fill="yellow" />
                  </>
                )}
              </p>
              <p className="text-white font-normal text-lg">
                {reviewCount ? `Based on ${reviewCount}` : "No reviews yet"}
              </p>
            </div>
          </div>
          <div className="w-fit h-fit ">
            {user.id ? (
              <button
                onClick={() => setOpenReviewForm(true)}
                className="w-fit h-fit px-2.5 py-1 rounded-md bg-green-400 text-white text-xl font-medium cursor-pointer"
              >
                Write A Review
              </button>
            ) : (
              <Link
                href={"/auth/sign-in"}
                className="w-fit h-fit px-2.5 py-1 rounded-md bg-green-400 text-white text-xl font-medium cursor-pointer"
              >
                Sign in to Write A Review
              </Link>
            )}
          </div>
        </div>
        <div className="w-full h-full max-h-64 overflow-y-scroll flex flex-col p-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.userId}
                className="w-full h-fit flex flex-col gap-2.5"
              >
                <h2 className="text-lg font-semibold">{review.userName}</h2>
                <p className="text-white/80">{review.comment}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      color="yellow"
                      fill={i < review.rate ? "yellow" : "none"}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-fit flex flex-col items-center">
              <h2>We’re looking for stars!</h2>
              <p className="text-white/70 text-lg">
                Let us know what you think.
              </p>
              {user.id ? (
                <button
                  onClick={() => setOpenReviewForm(true)}
                  className="w-fit h-fit px-2.5 py-1 rounded-md bg-green-400 text-white text-xl font-medium cursor-pointer"
                >
                  Write A Review
                </button>
              ) : (
                <Link
                  href={"/auth/sign-in"}
                  className="w-fit h-fit px-2.5 py-1 rounded-md bg-green-400 text-white text-xl font-medium cursor-pointer"
                >
                  Sign in to Write A Review
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
