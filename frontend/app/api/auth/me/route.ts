import { verifyTokenAndDevice } from "@/lib/helper/verifyTokenAndDevice";
import { UserModel } from "@/lib/mongodb/model/userModel";

export async function GET(req: Request) {
  try {
    const token =
      req.headers.get("authorization") ||
      req.headers.get("Authorization") ||
      req.headers.get("accesstoken") ||
      req.headers.get("accessToken") ||
      "";
    if (!token) {
      return Response.json(
        { message: "Unauthorized", status: 401 },
        { status: 401 },
      );
    }
    const auth = await verifyTokenAndDevice(token);
    if (!auth) {
      return Response.json(
        { status: 401, message: "Unauthorized or device no longer allowed" },
        { status: 401 },
      );
    }
    const user = await UserModel.findById(auth.userId)
      .select("-password")
      .lean();
    if (!user) {
      return Response.json(
        { status: 401, message: "User not found" },
        { status: 401 },
      );
    }
    return Response.json(
      { status: 200, message: "user sent", user },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (_e) {
    return Response.json(
      { status: 401, message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
