"use client";

import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

export default function AboutAnimation() {
  interface AnimationData {
    v: string;
    fr: number;
    ip: number;
    op: number;
    w: number;
    h: number;
    nm: string;
    ddd: number;
    assets: { id: string; type?: string; src?: string; [key: string]: unknown }[];
    layers: {
      ty: number;
      nm: string;
      [key: string]: unknown;
    }[];
  }

  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  // fetch JSON directly from /public/Animations
  useEffect(() => {
    fetch("/Animations/coding.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null; 

  return (
    <div className="flex justify-center items-center">
      <Lottie
        loop
        play
        animationData={animationData}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}
