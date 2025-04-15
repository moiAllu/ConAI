import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  phone_number: string;
  profile: string;
  created_at: Date;
  updated_at: Date;
  loginAttempts: number;
  activeSession: true;
  resetToken?: string;
  isSuscritpionActive?: boolean;
  bio?: string;
  plan: "free" | "basic" | "pro";
  stripe_subscription_id: string;
  usageLimit: {
    rewrite: number;
    aiWriting: number;
    imageGeneration: number;
    plagiairism: number;
    summarize: number;
    lastResetDate: Date;
  };
}

const userSchema = new Schema<IUser>({
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    required: false,
  },
  loginAttempts: {
    type: Number,
    required: false,
    default: 0,
  },
  activeSession: {
    type: Boolean,
    required: false,
  },
  resetToken: {
    type: String,
    required: false,
  },
  isSuscritpionActive: {
    type: Boolean,
    required: false,
    default: false,
  },
  bio: {
    type: String,
    required: false,
  },
  stripe_subscription_id: {
    type: String,
    required: false,
    default: "",
  },
  plan: {
    type: String,
    enum: ["free", "basic", "pro"],
    default: "free",
  },
  usageLimit: {
    rewrite: {
      type: Number,
      default: 0,
    },
    aiWriting: {
      type: Number,
      default: 0,
    },
    imageGeneration: {
      type: Number,
      default: 0,
    },
    plagiairism: {
      type: Number,
      default: 0,
    },
    summarize: {
      type: Number,
      default: 0,
    },
    lastResetDate: {
      type: Date,
      default: Date.now,
    },
  },
});

export const UserModel = model<IUser>("User", userSchema);
