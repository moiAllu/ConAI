import * as jwt from "jsonwebtoken";

interface TokenizationProps {
  user: Record<string, unknown>;
  deviceId?: string;
}

export const tokenization = async ({
  user,
  deviceId,
}: TokenizationProps): Promise<string> => {
  const secret = (process.env.JWT_SECRET as string) || "";
  const payload = deviceId ? { user, deviceId } : { user };
  return jwt.sign(payload, secret, { expiresIn: "8h" });
};

export type DecodedToken = {
  user?: { _id?: string; [key: string]: unknown };
  deviceId?: string;
};

export const verifyToken = (token: string): DecodedToken => {
  const secret = (process.env.JWT_SECRET as string) || "";
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
};