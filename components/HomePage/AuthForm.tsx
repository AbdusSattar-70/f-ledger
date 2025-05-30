/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import GoogleIcon from "../icons/GoogleIcon";
import { Eye, EyeOff } from "lucide-react";

// Constants for hardcoded text
const LOGIN_TITLE = "Welcome back";
const LOGIN_SUBTITLE = "Login to your F-Ledger account";
const SIGNUP_TITLE = "Create an account";
const SIGNUP_SUBTITLE = "Sign up to start using F-Ledger";
const EMAIL_LABEL = "Email";
const PASSWORD_LABEL = "Password";
const CONFIRM_PASSWORD_LABEL = "Confirm Password";
const FORGOT_PASSWORD_TEXT = "Forgot password?";
const OR = "Or";
const NO_ACCOUNT_TEXT = "Don’t have an account?";
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

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
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

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFirebaseError(null);
  };

  const onSubmit = async (data: FormData) => {
    setFirebaseError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      }
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

  const handleForgotPassword = async () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-background text-foreground">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/login.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex items-center justify-center h-full w-full px-4 py-12">
        <Card className="w-full max-w-md h-[90vh] backdrop-blur-md bg-white/20 dark:bg-gray-900/30 border border-white/30 shadow-xl flex flex-col">
          <CardContent className="scrollable p-6 md:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="text-xl font-semibold">
                  {mode === "login" ? LOGIN_TITLE : SIGNUP_TITLE}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? LOGIN_SUBTITLE : SIGNUP_SUBTITLE}
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

              {mode === "signup" && (
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
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs underline text-muted-foreground"
                  >
                    {FORGOT_PASSWORD_TEXT}
                  </button>
                </div>
              )}

              {firebaseError && (
                <p className="text-sm text-center text-red-500">
                  {firebaseError}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Signing up..."
                  : mode === "login"
                  ? LOGIN_TEXT
                  : SIGN_UP_TEXT}
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
                {mode === "login" ? (
                  <>
                    {NO_ACCOUNT_TEXT}{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="underline hover:text-primary"
                    >
                      {SIGN_UP_TEXT}
                    </button>
                  </>
                ) : (
                  <>
                    {HAVE_ACCOUNT_TEXT}{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="underline hover:text-primary"
                    >
                      {LOGIN_TEXT}
                    </button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
