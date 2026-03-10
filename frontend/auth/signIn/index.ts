import { CompareHash } from "@/lib/helper/encryption";
import { serializeCookie } from "@/lib/helper/serialize";
import { tokenization } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";
import { addOrUpdateDevice } from "@/auth/device";

interface SignInInterface {
  email: string;
  password: string;
  deviceId?: string;
  deviceName?: string;
  userAgent?: string;
}
export const signIn = async (
  procedure: string,
  { email, password, deviceId, deviceName, userAgent }: SignInInterface,
) => {
  try {
    // Check if user exists
    if (!email) {
      return {
        status: 400,
        message: "Please enter email",
      };
    }
    if (!password) {
      return {
        status: 400,
        message: "Password cannot be empty",
      };
    }
    let user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return {
        status: 400,
        message: "User not found",
      };
    }
    if (user.provider === "google") {
      return {
        status: 400,
        message: "This account uses Google sign-in. Please continue with Google.",
      };
    }
    if (!user.password) {
      return {
        status: 400,
        message: "Please sign in with Google.",
      };
    }
    if (CompareHash({ compare: password, comparedTo: user.password })) {
      user.password = "";
      if (deviceId) {
        const deviceResult = await addOrUpdateDevice(user._id.toString(), deviceId, {
          name: deviceName,
          userAgent,
        });
        if (deviceResult.status === 403) {
          return { status: 403, message: deviceResult.message };
        }
        user = await UserModel.findById(user._id);
        if (user) user.password = "";
      } else {
        user.lastLogin = new Date();
        await user.save();
      }
      const token = await tokenization({
        user: user!,
        deviceId: deviceId || undefined,
      });
      await serializeCookie({
        name: "CONAI",
        token,
        properties: {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: false,
          secure: false,
          overwrite: true,
        },
      });
      const response = {
        status: 200,
        message: "Login successful",
        user: user!,
        token: token,
      };
      return response;
    }
    return {
      status: 400,
      message: "Incorrect password",
    };
  } catch (e) {
    console.log(e);
    const response = {
      status: 500,
      message: e,
    };
    return response;
  }
};
