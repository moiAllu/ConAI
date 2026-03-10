import { NextRequest } from "next/server";
import { verifyTokenAndDevice } from "@/lib/helper/verifyTokenAndDevice";
import { UserModel } from "@/lib/mongodb/model/userModel";

export async function PATCH(req: NextRequest) {
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
    const {
      communication_emails,
      marketing_emails,
      social_emails,
      security_emails,
    } = body;
    const update: Record<string, boolean> = {};
    if (typeof communication_emails === "boolean")
      update["notifications.communication_emails"] = communication_emails;
    if (typeof marketing_emails === "boolean")
      update["notifications.marketing_emails"] = marketing_emails;
    if (typeof social_emails === "boolean")
      update["notifications.social_emails"] = social_emails;
    if (typeof security_emails === "boolean")
      update["notifications.security_emails"] = security_emails;

    if (Object.keys(update).length === 0) {
      return Response.json(
        { status: 400, message: "No valid notification fields to update" },
        { status: 400 }
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      auth.userId,
      { $set: { ...update, updated_at: new Date() } },
      { new: true }
    )
      .select("-password")
      .lean();

    if (!user) {
      return Response.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json({
      status: 200,
      message: "Notifications updated",
      user,
    });
  } catch {
    return Response.json(
      { status: 401, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
