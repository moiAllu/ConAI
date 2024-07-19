"use client";
import Link from "next/link";
import { useState } from "react";

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
import { number } from "zod";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [success, setSuccess] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setOtpRequestGen(null);
    setSuccess("");
    setError("");
    setLoading(true);
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all the fields");
      setLoading(false);
      setOtpRequestGen(null);
      return;
    }

    if (firstName === lastName) {
      setError("First name and last name cannot be the same");
      setLoading(false);
      setOtpRequestGen(null);

      return;
    }
    if (password.length < 8) {
      setError("Password must be atleast 8 characters long");
      setLoading(false);
      setOtpRequestGen(null);
      return;
    }

    if (firstName.length < 3 || lastName.length < 3) {
      setError("First name and last name must be atleast 3 characters long");
      setLoading(false);
      setOtpRequestGen(null);
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email address");
      setLoading(false);
      setOtpRequestGen(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: firstName + lastName, email, password }),
        method: "POST",
      });
      const data = await response.json();
      if (data.status === 201 || data.status === 200) {
        setLoadingOtp(true);
        setSuccess(data.message);
        setUser(data.user);
        const otpResponse = await fetch(
          "http://localhost:8000/api/user/otp-request",
          {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
            method: "POST",
          }
        );
        const otpRequest = await otpResponse.json();
        if (otpRequest.message === "OTP sent successfully") {
          console.log("OTP sent successfully");
          setOtpRequestGen(otpRequest);
          setLoadingOtp(false);
        }
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (e) {
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
                    setError("");
                    if (/\d/.test(e.target.value)) {
                      return setError("Invalid cannot enter number");
                    }
                    return setFirstName(e.target.value);
                  }}
                  className={`${error && " border-red-700"}`}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setError("");
                    if (/\d/.test(e.target.value)) {
                      return setError("Invalid cannot enter number");
                    }
                    return setLastName(e.target.value);
                  }}
                  className={`${error && " border-red-700"}`}
                  disabled={loading}
                />
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
                onChange={(e) => setEmail(e.target.value)}
                className={`${error && " border-red-700"}`}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${error && " border-red-700"}`}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="flex w-full justify-center text-red-700 p-2 rounded bg-muted">
                <Label className="font-semibold text-md">{error}</Label>
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
          <Button variant="outline" className="w-full" disabled={loading}>
            Sign up with Google
          </Button>
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
