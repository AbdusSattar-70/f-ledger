"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore"; // Updated import
import { TopNavBar } from "./TopNavbar";
import { AppSidebar } from "./AppSidebar";
import { StatsHeader } from "./StatsHeader";
import { SkeletonCard } from "../skeleton-card";

export default function HomeWrapper() {
  const user = useAuthStore((state) => state.user); // Zustand state
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return <SkeletonCard />;
  }

  return (
    <div className="h-screen flex flex-col dark bg-gray-900 text-gray-100">
      <TopNavBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar isSideBarOpen={isSideBarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <StatsHeader />
          <main className="flex-1 p-6 flex items-center justify-center scrollable">
            <p>Main content goes here...</p>
          </main>
        </div>
      </div>
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}
    </div>
  );
}
