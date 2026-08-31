"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TypewriterTitleProps {
  text: string;
  className?: string;
  cursor?: boolean;
  speed?: number;
}

export default function TypewriterTitle({
  text,
  className = "",
  cursor = true,
  speed = 0.035,
}: TypewriterTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });

  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, width: 0, display: "none" },
    visible: {
      opacity: 1,
      width: "auto",
      display: "inline",
      transition: { duration: 0.01 },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block whitespace-pre-wrap ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="font-light text-slate-400 inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
}
