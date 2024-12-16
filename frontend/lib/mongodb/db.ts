import mongoose, { Connection } from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URL as string
// Ensure MONGODB_URI is defined in .env.local
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local')
}
async function dbConnect() {
    try {
        mongoose.set("strictQuery", true);
        const connectToDb = await mongoose.connect(MONGODB_URI);
        if (connectToDb) {
          console.log("Connected to MongoDB");
        }
      } catch (e) {
        console.log(e);
      }
}
export default dbConnect
