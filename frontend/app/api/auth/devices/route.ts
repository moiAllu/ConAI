import { NextRequest } from "next/server";
import { verifyTokenAndDevice } from "@/lib/helper/verifyTokenAndDevice";
import { getDevices } from "@/auth/device";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.headers.get("authorization") ||
      req.headers.get("Authorization") ||
      req.headers.get("accesstoken") ||
      req.headers.get("accessToken") ||
      "";
    const auth = await verifyTokenAndDevice(token);
    if (!auth) {
      return Response.json(
        { status: 401, message: "Unauthorized or device no longer allowed" },
        { status: 401 }
      );
    }
    const result = await getDevices(auth.userId);
    if (result.status !== 200) {
      return Response.json(
        { status: result.status, message: result.message },
        { status: result.status as number }
      );
    }
    return Response.json({
      status: 200,
      devices: result.devices,
      lastLogin: result.lastLogin,
    });
  } catch (e) {
    return Response.json(
      { status: 401, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
