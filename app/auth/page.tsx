"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/HomePage/AuthForm";
import { SkeletonCard } from "@/components/skeleton-card";

export default function AuthPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) {
    return <SkeletonCard />;
  }

  return <AuthForm />;
}
