"use client";

import { useState, useEffect, useCallback } from "react";

const ACCESS_TOKEN_KEY = "accessToken";

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Returns whether the user is considered logged in based on the presence of accessToken in localStorage.
 * Updates when localStorage changes (e.g. login/logout in another tab) or when the window is focused.
 */
export function useIsLoggedIn(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => Boolean(getAccessToken()));

  const check = useCallback(() => {
    setIsLoggedIn(Boolean(getAccessToken()));
  }, []);

  useEffect(() => {
    check();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_KEY) {
        setIsLoggedIn(Boolean(e.newValue));
      }
    };

    const handleFocus = () => {
      check();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
    };
  }, [check]);

  return isLoggedIn;
}
