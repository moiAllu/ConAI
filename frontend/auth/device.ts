import { UserModel } from "@/lib/mongodb/model/userModel";
import type { IDevice } from "@/lib/mongodb/model/userModel";

const MAX_DEVICES = 5;

function parseDeviceName(userAgent?: string): string {
  if (!userAgent) return "Unknown device";
  if (/mobile|android|iphone|ipad/i.test(userAgent)) return "Mobile device";
  if (/mac|darwin/i.test(userAgent)) return "Mac";
  if (/windows/i.test(userAgent)) return "Windows PC";
  if (/linux/i.test(userAgent)) return "Linux";
  return "Web browser";
}

export async function addOrUpdateDevice(
  userId: string,
  deviceId: string,
  options?: { name?: string; userAgent?: string }
): Promise<{ status: number; message: string; devices?: IDevice[] }> {
  const name = options?.name || parseDeviceName(options?.userAgent);
  const userAgent = options?.userAgent;
  const now = new Date();

  const user = await UserModel.findById(userId);
  if (!user) return { status: 404, message: "User not found" };

  const devices = (user.devices || []) as IDevice[];
  const existingIndex = devices.findIndex((d) => d.deviceId === deviceId);

  if (existingIndex >= 0) {
    devices[existingIndex].lastUsed = now;
    devices[existingIndex].name = name;
    if (userAgent !== undefined) devices[existingIndex].userAgent = userAgent;
  } else {
    if (devices.length >= MAX_DEVICES) {
      return {
        status: 403,
        message: `Maximum ${MAX_DEVICES} devices allowed. Remove a device in Settings > Devices.`,
      };
    }
    devices.push({
      deviceId,
      name,
      lastUsed: now,
      userAgent,
    });
  }

  user.lastLogin = now;
  user.devices = devices;
  await user.save();

  return {
    status: 200,
    message: "Device registered",
    devices: user.devices as IDevice[],
  };
}

export async function removeDevice(
  userId: string,
  deviceId: string
): Promise<{ status: number; message: string; devices?: IDevice[] }> {
  const user = await UserModel.findById(userId);
  if (!user) return { status: 404, message: "User not found" };

  const devices = ((user.devices || []) as IDevice[]).filter(
    (d) => d.deviceId !== deviceId
  );
  user.devices = devices;
  await user.save();

  return {
    status: 200,
    message: "Device removed",
    devices,
  };
}

export async function getDevices(
  userId: string
): Promise<{ status: number; devices?: IDevice[]; lastLogin?: Date; message?: string }> {
  const user = await UserModel.findById(userId).select("devices lastLogin");
  if (!user) return { status: 404, message: "User not found" };
  return {
    status: 200,
    devices: (user.devices || []) as IDevice[],
    lastLogin: user.lastLogin,
  };
}
