import { verifyToken, type DecodedToken } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";

export type AuthResult = {
  userId: string;
  decoded: DecodedToken;
};

/**
 * Verifies the JWT and, if it contains a deviceId, ensures that device is still
 * in the user's devices list. Removed devices get 401 so they must sign in again.
 */
export async function verifyTokenAndDevice(
  token: string
): Promise<AuthResult | null> {
  const decoded = verifyToken(token);
  const userId =
    decoded?.user?._id != null ? String(decoded.user._id) : "";
  if (!userId) return null;

  if (decoded.deviceId) {
    const user = await UserModel.findById(userId).select("devices");
    if (!user) return null;
    const devices = (user.devices || []) as { deviceId: string }[];
    const stillAllowed = devices.some(
      (d) => String(d.deviceId) === String(decoded.deviceId)
    );
    if (!stillAllowed) return null;
  }

  return { userId, decoded };
}
