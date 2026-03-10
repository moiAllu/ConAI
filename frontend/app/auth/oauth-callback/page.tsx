"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMeStore } from "@/app/dashboard/store";

function decodeJwtPayload(token: string): { user?: any } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return {};
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return {};
  }
}

function normalizeUser(raw: any) {
  if (!raw) return null;
  return {
    ...raw,
    createdAt: raw.createdAt ?? raw.created_at,
    updatedAt: raw.updatedAt ?? raw.updated_at,
    avatar: raw.avatar ?? raw.profile,
  };
}

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const setUser = useMeStore((s) => s.setUser);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }
    localStorage.setItem("accessToken", token);
    const payload = decodeJwtPayload(token);
    const user = normalizeUser(payload?.user);
    if (user) {
      setUser(user);
    }
    setStatus("done");
    window.location.href = "/dashboard";
  }, [setUser]);

  useEffect(() => {
    if (status === "error") {
      const t = setTimeout(() => {
        router.replace("/login");
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [status, router]);

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Invalid or missing token. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="ml-3 text-muted-foreground">Signing you in...</span>
    </div>
  );
}
