"use client";

import Image from "next/image";

type CustomIconProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export default function CustomIcon({
  src,
  alt,
  size = 20,
  className = "",
}: CustomIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
