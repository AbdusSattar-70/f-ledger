"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Branding } from "@/components/branding";

// Typing sentences
const sentences = [
  "Pay off debt and stay out for good",
  "Save more money without feeling restricted",
  "Have money saved for next month",
  "Feel confident with an irregular income",
  "Feel organized about my finances",
  "Be less stressed about money",
  "Stop arguing about money with my partner",
];

// PenCursor component with SVG
const PenCursor = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M2 10 L6 2 L10 10 Z" fill="#d292ff" />
  </svg>
);

function TypingText() {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [typing, setTyping] = React.useState(true);
  const [cursorVisible, setCursorVisible] = React.useState(true);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (text.length < sentences[index].length) {
        timeout = setTimeout(() => {
          setText(sentences[index].slice(0, text.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 30);
      } else {
        setTyping(true);
        setIndex((prev) => (prev + 1) % sentences.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, typing, index]);

  React.useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  return (
    <div className="mt-4 text-[#d292ff]" aria-live="polite">
      {text}
      {cursorVisible && (
        <span className="pen-cursor">
          <PenCursor />
        </span>
      )}
    </div>
  );
}

function AuthButtons() {
  return (
    <div className="flex flex-row gap-4 mt-4 mb-6">
      <Link
        href="/sign-in"
        className="px-5 py-2.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800 text-center"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="px-5 py-2.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800 text-center"
      >
        Sign Up
      </Link>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="flex items-center space-x-2 text-sm text-white">
      <Lock className="w-4 h-4" />
      <a href="#" className="hover:underline">
        Terms of use
      </a>
      <span>|</span>
      <a href="#" className="hover:underline">
        Privacy policy
      </a>
    </div>
  );
}

export default function AuthHomePage() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[60%_40%] min-h-screen md:h-screen">
      {/* Left Section */}
      <section className="flex-grow bg-[#00002e] px-6 py-10 md:p-12 flex flex-col">
        <div className="mb-4">
          <Branding />
        </div>
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <h2 className="text-gray-300 text-base font-semibold">
              What will you accomplish with{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                F-Ledger
              </span>
              ?
            </h2>
            <h3 className="text-[#d292ff] text-sm sm:text-base font-normal pt-4">
              I want to
              <TypingText />
            </h3>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="bg-black px-6 py-10 md:p-12 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Get started</h2>
            <AuthButtons />
          </div>
        </div>
        <div>
          <FooterLinks />
        </div>
      </section>
    </div>
  );
}
