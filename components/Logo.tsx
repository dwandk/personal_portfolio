"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "w-7 h-7", size }: LogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 500 500"
      fill="currentColor"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AD Logo"
    >
      {/* Letter A */}
      <path
        d="
          M 180 50 
          L 202 50 
          L 290 450 
          L 242 450 
          L 216 335 
          L 116 335 
          L 90 450 
          L 42 450 
          Z 
          M 127 288 
          L 205 288 
          L 166 112 
          Z
        "
      />
      {/* Letter D interlocked with A */}
      <path
        d="
          M 205 160 
          L 340 160 
          C 425 160, 475 210, 475 305 
          C 475 400, 425 450, 340 450 
          L 260 450 
          L 260 260 
          L 306 260 
          L 306 404 
          L 340 404 
          C 398 404, 429 370, 429 305 
          C 429 240, 398 206, 340 206 
          L 225 206 
          Z
        "
      />
    </svg>
  );
}
