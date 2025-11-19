"use client";

import { ThreeDot } from "react-loading-indicators";

export default function ThereeDotComponent({ text }: { text: string }) {
  return (
    <ThreeDot
      variant="bounce"
      color="rgba(47, 40, 144, 0.85)"
      text={text}
      size="large"
    />
  );
}

