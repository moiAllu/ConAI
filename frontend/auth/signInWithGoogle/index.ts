import { serializeCookie } from "@/lib/helper/serialize";
import { tokenization } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";

export interface GoogleProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verified_email?: boolean;
}

export const signInWithGoogle = async (profile: GoogleProfile) => {
  try {
    if (!profile.email) {
      return { status: 400, message: "Email not provided by Google." };
    }
    let user = await UserModel.findOne({ email: profile.email });
    if (user) {
      if (user.provider === "credentials") {
        return {
          status: 400,
          message:
            "An account with this email already exists. Please sign in with your password.",
        };
      }
      // Existing Google user – update name/picture if changed
      user.name = profile.name || user.name;
      user.profile = profile.picture || user.profile;
      user.updated_at = new Date();
      await user.save();
    } else {
      user = new UserModel({
        name: profile.name || profile.email.split("@")[0],
        email: profile.email,
        verified: true,
        provider: "google",
        profile: profile.picture,
      });
      await user.save();
    }
    user.lastLogin = new Date();
    await user.save();
    (user as any).password = undefined;
    const token = await tokenization({ user });
    await serializeCookie({
      name: "CONAI",
      token,
      properties: {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: false,
        secure: process.env.NODE_ENV === "production",
        overwrite: true,
      },
    });
    return {
      status: 200,
      message: "Sign-in successful",
      user,
      token,
    };
  } catch (e) {
    console.error("signInWithGoogle error:", e);
    return {
      status: 500,
      message: "Failed to sign in with Google.",
    };
  }
};
