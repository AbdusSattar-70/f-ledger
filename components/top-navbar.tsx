"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import LogoIcon from "./icons/logo";

export function TopNavBar({
  setIsSideBarOpen,
  isSideBarOpen,
  user,
}: {
  setIsSideBarOpen: (value: boolean) => void;
  isSideBarOpen: boolean;
  user: User;
}) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0">
                <Image
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-blue-500 shadow-md"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="grid gap-2">
                <Button variant="ghost">Profile</Button>
                <Button variant="ghost">Settings</Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
