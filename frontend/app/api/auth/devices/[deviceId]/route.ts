import { NextRequest } from "next/server";
import { verifyTokenAndDevice } from "@/lib/helper/verifyTokenAndDevice";
import { removeDevice } from "@/auth/device";
import { UserModel } from "@/lib/mongodb/model/userModel";
import { CompareHash } from "@/lib/helper/encryption";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> }
) {
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
    const { deviceId } = await params;
    if (!deviceId) {
      return Response.json(
        { status: 400, message: "deviceId is required" },
        { status: 400 }
      );
    }
    const body = await req.json().catch(() => ({}));
    const { password } = body;
    const user = await UserModel.findById(auth.userId);
    if (!user) {
      return Response.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }
    if (user.provider === "credentials") {
      if (!password || typeof password !== "string") {
        return Response.json(
          { status: 400, message: "Password is required to remove a device" },
          { status: 400 }
        );
      }
      if (!user.password) {
        return Response.json(
          { status: 400, message: "Cannot verify password for this account" },
          { status: 400 }
        );
      }
      const valid = CompareHash({
        compare: password,
        comparedTo: user.password,
      });
      if (!valid) {
        return Response.json(
          { status: 401, message: "Incorrect password" },
          { status: 401 }
        );
      }
    }
    const result = await removeDevice(auth.userId, deviceId);
    return Response.json({
      status: result.status,
      message: result.message,
      devices: result.devices,
    });
  } catch (e) {
    return Response.json(
      { status: 401, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
