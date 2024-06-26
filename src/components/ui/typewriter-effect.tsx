"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export const TypewriterEffect = ({
  words,
  duration,
  delay,
  className,
  cursorClassName,
}: {
  words: string;
  className?: string;
  duration?: number;
  delay?: number;
  cursorClassName?: string;
}) => {
  // split text into array of words
  const wordsArray = words.split(" ");
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.split("").map((char, index) => (
                <span key={`char-${index}`}>{char}</span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: duration,
          ease: "linear",
          delay: delay,
        }}
      >
        <div
          className="font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-8 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
