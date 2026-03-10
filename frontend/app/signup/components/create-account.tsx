"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/loading-spinner";
import { useMeStore } from "@/app/dashboard/store";
import { GoogleIcon } from "@/components/icons/google-icon";
interface CreateAccountProps {
  setOtpRequestGen: (otpRequestGen: any) => void;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}
export default function CreateAccount({
  setOtpRequestGen,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  setFirstName,
  setLastName,
  setPassword,
  setEmail,
  setConfirmPassword,
}: CreateAccountProps) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useMeStore();
  const [success, setSuccess] = useState("");

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("One uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("One lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("One number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("One special character");
    }
    return errors;
  };

  const getPasswordRequirementStatus = (password: string) => {
    return {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setOtpRequestGen(null);
    setSuccess("");
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });
    setLoading(true);

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!firstName || firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters long";
    }
    if (!lastName || lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters long";
    }
    if (firstName === lastName) {
      newErrors.general = "First name and last name cannot be the same";
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      newErrors.email = "Invalid email address";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Invalid Password";
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(", ");
    }
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      setLoading(false);
      setOtpRequestGen(null);
      return;
    }
    try {
      const response = await fetch("/api/auth/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: firstName + lastName, email, password }),
        method: "POST",
      });
      const data = await response.json();
      if (data.status === 201 || data.status === 200) {
        setSuccess(data.message);
        setUser(data.user);
        router.push("/signup/verify-otp");
      } else {
        setErrors({ ...errors, general: data.message });
      }
      setLoading(false);
    } catch (e) {
      setErrors({ ...errors, general: "An error occurred during signup" });
      console.log(e);
    }
  };
  const handleGoogleSignUp = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="mx-auto w-full max-w-[420px] border-0 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50 rounded-2xl">
        <CardHeader className="space-y-1.5 pb-6 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full border-slate-200 bg-white font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-800/80"
            onClick={handleGoogleSignUp}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground dark:bg-slate-900/80">
                or continue with email
              </span>
            </div>
          </div>

          <form className="grid gap-4 mb-2" onSubmit={formSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setErrors({ ...errors, firstName: "", general: "" });
                    if (/\d/.test(e.target.value)) {
                      setErrors({
                        ...errors,
                        firstName: "Cannot contain numbers",
                      });
                      return;
                    }
                    setFirstName(e.target.value);
                  }}
                  className={`h-11 rounded-lg ${errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  disabled={loading}
                />
                {errors.firstName && (
                  <span className="text-sm text-red-700">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setErrors({ ...errors, lastName: "", general: "" });
                    if (/\d/.test(e.target.value)) {
                      setErrors({
                        ...errors,
                        lastName: "Cannot contain numbers",
                      });
                      return;
                    }
                    setLastName(e.target.value);
                  }}
                  className={`h-11 rounded-lg ${errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  disabled={loading}
                />
                {errors.lastName && (
                  <span className="text-sm text-red-700">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, email: "", general: "" });
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(e.target.value)) {
                    setErrors({
                      ...errors,
                      email: "Please enter a valid email address",
                    });
                  }
                  setEmail(e.target.value);
                }}
                className={`h-11 rounded-lg ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                disabled={loading}
              />
              {errors.email && (
                <span className="text-sm text-red-700">{errors.email}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setErrors({ ...errors, password: "" });
                  setPassword(e.target.value);
                }}
                className={`h-11 rounded-lg ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                disabled={loading}
              />
            </div>
            {password.length > 0 && (
              <>
                <div className="text-xs space-y-1">
                  <p className="text-muted-foreground">Password requirements:</p>
                  {Object.entries(getPasswordRequirementStatus(password)).map(
                    ([requirement, isMet]) => (
                      <div key={requirement} className="flex items-center gap-2">
                        {isMet ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span
                          className={isMet ? "text-green-500" : "text-gray-500"}
                        >
                          {requirement === "minLength" && "At least 8 characters"}
                          {requirement === "uppercase" && "One uppercase letter"}
                          {requirement === "lowercase" && "One lowercase letter"}
                          {requirement === "number" && "One number"}
                          {requirement === "special" &&
                            'One special character (!@#$%^&*(),.?":{}|<>)'}
                        </span>
                      </div>
                    ),
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setErrors({ ...errors, confirmPassword: "" });
                      setConfirmPassword(e.target.value);
                    }}
                    className={`h-11 rounded-lg ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    disabled={loading}
                  />
                </div>
              </>
            )}
            {errors.general && (
              <div className="flex w-full justify-center text-red-700 p-2 rounded bg-muted">
                <Label className="font-semibold text-md">
                  {errors.general}
                </Label>
              </div>
            )}
            {success && (
              <div className="flex w-full justify-center text-green-700 p-2 rounded bg-muted">
                <Label className="font-semibold text-md">{success}</Label>
              </div>
            )}
            <Button
              type="submit"
              className="h-11 w-full rounded-lg font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Creating account…</span>
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
