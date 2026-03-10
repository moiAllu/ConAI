"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getOrCreateDeviceId, getDeviceName } from "@/lib/helper/deviceId";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Device {
  deviceId: string;
  name: string;
  lastUsed: string;
  userAgent?: string;
}

export function DevicesForm() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [currentDeviceId, setCurrentDeviceId] = useState("");
  const [deviceToRemove, setDeviceToRemove] = useState<Device | null>(null);
  const [password, setPassword] = useState("");
  const [dialogError, setDialogError] = useState("");

  useEffect(() => {
    setCurrentDeviceId(getOrCreateDeviceId());
  }, []);

  const fetchDevices = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const deviceId = getOrCreateDeviceId();
      const regRes = await fetch("/api/auth/register-device", {
        method: "POST",
        headers: { "Content-Type": "application/json", accessToken: token },
        body: JSON.stringify({
          deviceId,
          name: getDeviceName(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
      });
      const regData = await regRes.json();
      const currentToken = regData.token ?? token;
      if (regData.token) localStorage.setItem("accessToken", regData.token);
      const res = await fetch("/api/auth/devices", {
        headers: { accessToken: currentToken },
      });
      const data = await res.json();
      if (data.status === 200) {
        setDevices(data.devices ?? []);
        setLastLogin(data.lastLogin ?? null);
      }
    } catch {
      toast.error("Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const openRemoveDialog = (device: Device) => {
    setDialogError("");
    setPassword("");
    setDeviceToRemove(device);
  };

  const closeRemoveDialog = () => {
    setDeviceToRemove(null);
    setPassword("");
    setDialogError("");
    setRemovingId(null);
  };

  const confirmRemoveDevice = async () => {
    if (!deviceToRemove) return;
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setRemovingId(deviceToRemove.deviceId);
    setDialogError("");
    try {
      const res = await fetch(
        `/api/auth/devices/${encodeURIComponent(deviceToRemove.deviceId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accessToken: token,
          },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        const wasCurrentDevice = deviceToRemove.deviceId === currentDeviceId;
        closeRemoveDialog();
        setDevices(data.devices ?? []);
        toast.success("Device removed. It will need to sign in again.");
        if (wasCurrentDevice) {
          localStorage.removeItem("accessToken");
          router.push("/login");
          window.location.href = "/login";
        }
      } else {
        setDialogError(data.message ?? "Failed to remove device");
        setRemovingId(null);
      }
    } catch {
      setDialogError("Failed to remove device");
      setRemovingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return d.toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  const isCurrent = (id: string) => id === currentDeviceId;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {lastLogin && (
        <p className="text-sm text-muted-foreground">
          Last login: {formatDate(lastLogin)}
        </p>
      )}
      <p className="text-sm text-muted-foreground">
        {devices.length} of 5 devices in use
      </p>
      {devices.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No devices registered yet. Devices are added when you sign in.
        </p>
      ) : (
        <ul className="space-y-3">
          {devices.map((device) => {
            const current = isCurrent(device.deviceId);
            return (
              <li key={device.deviceId}>
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {/mobile|android|iphone|ipad/i.test(device.name) ? (
                          <Smartphone className="h-5 w-5 text-muted-foreground shrink-0" />
                        ) : (
                          <Monitor className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                        <div>
                          <CardTitle className="text-base font-medium">
                            {device.name}
                            {current && (
                              <span className="ml-2 text-xs font-normal text-primary">
                                (This device)
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            Last used {formatDate(device.lastUsed)}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => openRemoveDialog(device)}
                        disabled={removingId === device.deviceId}
                        aria-label={`Remove ${device.name}`}
                      >
                        {removingId === device.deviceId ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <AlertDialog open={!!deviceToRemove} onOpenChange={(open) => !open && closeRemoveDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove device</AlertDialogTitle>
            <AlertDialogDescription>
              {deviceToRemove && deviceToRemove.deviceId === currentDeviceId
                ? "This will remove this device and sign you out. You will need to sign in again."
                : "This device will be signed out and must sign in again."}
              {" "}Enter your account password to confirm. If you sign in with Google, leave blank.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Label htmlFor="device-password">Password</Label>
            <Input
              id="device-password"
              type="password"
              placeholder="Your account password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setDialogError("");
              }}
              className="mt-2"
              autoComplete="current-password"
            />
            {dialogError && (
              <p className="text-sm text-destructive mt-2">{dialogError}</p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmRemoveDevice();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removingId === deviceToRemove?.deviceId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Remove device"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
