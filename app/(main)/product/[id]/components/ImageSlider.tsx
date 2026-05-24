"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: Array<{
    url: string;
    alt?: string;
  }>;
  productName?: string;
}

export const ImageSlider = ({
  images,
  productName = "Product",
}: ImageSliderProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="text-white/50">No images available</div>;
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="w-full flex flex-col-reverse md:flex-row flex-nowrap gap-4">
      {/* Thumbnails */}
      <div className="flex flex-row items-center justify-start md:flex-col gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`relative rounded-lg border transition cursor-pointer ${
              selectedImageIndex === index
                ? "border-emerald-400"
                : "border-white/10 hover:border-emerald-400/50"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt || `${productName} - ${index + 1}`}
              width={90}
              height={90}
              className="p-1"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          width={420}
          height={420}
          className="rounded-xl border border-white/10 shadow-lg shadow-emerald-400/10 w-full h-auto"
        />
      </div>
    </div>
  );
};
