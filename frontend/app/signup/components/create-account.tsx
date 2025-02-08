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
interface CreateAccountProps {
  setOtpRequestGen: (otpRequestGen: any) => void;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}
export default function CreateAccount({
  setOtpRequestGen,
  firstName,
  lastName,
  email,
  password,
  setFirstName,
  setLastName,
  setPassword,
  setEmail,
}: CreateAccountProps) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      general: "",
    });
    setLoading(true);

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
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
  return (
    <div className="flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  className={`${errors.firstName && "border-red-700"}`}
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
                  className={`${errors.lastName && "border-red-700"}`}
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
                className={`${errors.email && "border-red-700"}`}
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
                className={`${errors.password && "border-red-700"}`}
                disabled={loading}
              />
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
                  )
                )}
              </div>
            </div>
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
              className="w-full flex space-x-2 items-center"
              disabled={loading}
            >
              <span> Create an account</span>
              {loading && <LoadingSpinner />}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
