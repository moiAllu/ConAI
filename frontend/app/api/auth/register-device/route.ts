import { NextRequest } from "next/server";
import { verifyTokenAndDevice } from "@/lib/helper/verifyTokenAndDevice";
import { addOrUpdateDevice } from "@/auth/device";
import { tokenization } from "@/lib/helper/token";
import { serializeCookie } from "@/lib/helper/serialize";
import { UserModel } from "@/lib/mongodb/model/userModel";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { deviceId, name, userAgent } = body;
    if (!deviceId || typeof deviceId !== "string") {
      return Response.json(
        { status: 400, message: "deviceId is required" },
        { status: 400 }
      );
    }
    const result = await addOrUpdateDevice(auth.userId, deviceId, {
      name,
      userAgent,
    });
    if (result.status === 403) {
      return Response.json(
        { status: 403, message: result.message },
        { status: 403 }
      );
    }
    const user = await UserModel.findById(auth.userId);
    if (!user) {
      return Response.json(
        { status: 401, message: "User not found" },
        { status: 401 }
      );
    }
    (user as any).password = undefined;
    const newToken = await tokenization({
      user,
      deviceId,
    });
    await serializeCookie({
      name: "CONAI",
      token: newToken,
      properties: {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: false,
        secure: process.env.NODE_ENV === "production",
        overwrite: true,
      },
    });
    return Response.json({
      status: result.status,
      message: result.message,
      devices: result.devices,
      token: newToken,
    });
  } catch (e) {
    return Response.json(
      { status: 401, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
