import mongoose from "mongoose";
import { Express } from "express";
interface IConnectDB {
    url: string;
}
export const connectDB = async (props:IConnectDB) => {
  try {
    mongoose.set("strictQuery", true);
    const connectToDb = await mongoose.connect(props.url);
    if (connectToDb) {
      console.log("Connected to MongoDB");
    }
  } catch (e) {
    console.log(e);
  }
};
