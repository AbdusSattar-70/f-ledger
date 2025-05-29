"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import LogoIcon from "./icons/logo";
import { NavUser } from "./nav-user";

export function TopNavBar({
  setIsSideBarOpen,
  isSideBarOpen,
}: {
  setIsSideBarOpen: (value: boolean) => void;
  isSideBarOpen: boolean;
}) {
  return (
    <header>
      <nav className="h-14 flex items-center justify-between px-4 bg-gray-800/80 border-gray-700 backdrop-blur-md border-b transition-colors duration-300 shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button
            title="Toggle Sidebar"
            type="button"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="md:hidden mr-2 text-teal-400 cursor-pointer"
          >
            <Menu size={20} className="hover:text-teal-600 transition-colors" />
          </button>
          <Link href="/">
            <h1 className="flex items-center">
              <LogoIcon />
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent hidden md:inline">
                F-Ledger
              </span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <NavUser />
        </div>
      </nav>
    </header>
  );
}
