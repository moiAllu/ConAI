import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URL as string

// Ensure MONGODB_URI is defined in .env.local
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local')
}

let cached = global.mongoose

// Check if cached connection exists, if not, create it
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    // If there's already a cached connection, return it
    if (cached.conn) {
        return cached.conn
    }

    // If no promise is currently being made to connect, initiate the connection
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering of commands
            useNewUrlParser: true,  // Use the new URL parser (if using Mongoose < 6.x, it's recommended to keep this option)
            useUnifiedTopology: true,  // Enable unified topology (recommended for MongoDB driver)
        }

        // Create a promise to connect to MongoDB
        try {
            mongoose.set("strictQuery", true);
            cached.promise = await mongoose.connect(MONGODB_URI, opts);
            if (cached.promise) {
              console.log("Connected to MongoDB");
            }
          } catch (e) {
            console.log(e);
          }
  
    }

    // Wait for the promise to resolve and set the connection to the cached connection
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null // Reset the promise if an error occurs
        throw new Error('Error connecting to MongoDB: ' + error)
    }

    return cached.conn
}

export default dbConnect
