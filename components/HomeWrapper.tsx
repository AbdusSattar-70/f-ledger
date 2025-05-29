"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavBar } from "@/components/top-navbar";
import { StatsHeader } from "@/components/StatsHeader";

export default function HomeWrapper() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return null; // Optionally, add a loading spinner here
  }

  return (
    <div className="h-screen flex flex-col dark bg-gray-900 text-gray-100">
      <TopNavBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        user={user}
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
