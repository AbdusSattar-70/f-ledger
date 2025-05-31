/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { auth } from "@/lib/firebase/config";
import GoogleIcon from "@/components/icons/GoogleIcon";
import Link from "next/link";
import { SkeletonCard } from "@/components/skeleton-card";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

// Constants for hardcoded text
const SIGNUP_TITLE = "Create an account";
const SIGNUP_SUBTITLE = "Sign up to start using F-Ledger";
const EMAIL_LABEL = "Email";
const PASSWORD_LABEL = "Password";
const CONFIRM_PASSWORD_LABEL = "Confirm Password";
const OR = "Or";
const HAVE_ACCOUNT_TEXT = "Already have an account?";
const SIGN_UP_TEXT = "Sign up";
const LOGIN_TEXT = "Login";
const GOOGLE_SIGN_IN_TEXT = "Continue with Google";

const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setFirebaseError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      setFirebaseError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setFirebaseError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error: any) {
      setFirebaseError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return <SkeletonCard />;
  }
  return (
    <div className="relative h-screen w-full bg-background text-foreground">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/hero-section.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex items-center justify-center h-full w-full px-4 py-12">
        <Card className="w-full max-w-md h-[70vh] backdrop-blur-md bg-white/20 dark:bg-gray-900/30 border border-white/30 shadow-xl flex flex-col">
          <CardContent className="scrollable p-6 md:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="text-xl font-semibold">{SIGNUP_TITLE}</h1>
                <p className="text-sm text-muted-foreground">
                  {SIGNUP_SUBTITLE}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">{EMAIL_LABEL}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2 relative">
                <Label htmlFor="password">{PASSWORD_LABEL}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2 relative">
                <Label htmlFor="confirmPassword">
                  {CONFIRM_PASSWORD_LABEL}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {firebaseError && (
                <p className="text-sm text-center text-red-500">
                  {firebaseError}
                </p>
              )}

              <Button
                variant="outline"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Signing up...</span>
                    <Loader2Icon className="animate-spin" />
                  </>
                ) : (
                  SIGN_UP_TEXT
                )}
              </Button>

              <div className="relative text-center text-sm my-2">
                <span className="relative z-10 bg-background px-2">{OR}</span>
                <div className="absolute inset-0 top-1/2 border-t border-muted z-0" />
              </div>

              <Button
                variant="outline"
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full"
              >
                <GoogleIcon />
                <span className="ml-2">{GOOGLE_SIGN_IN_TEXT}</span>
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                {HAVE_ACCOUNT_TEXT}{" "}
                <Link href="/sign-in" className="underline hover:text-primary">
                  {LOGIN_TEXT}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
