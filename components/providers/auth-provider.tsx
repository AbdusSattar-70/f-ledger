"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useAuthStore } from "@/stores/useAuthStore";
import { SkeletonCard } from "../skeleton-card";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (loading) {
    return <SkeletonCard />;
  }

  return <>{children}</>;
};
