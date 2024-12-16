import mongoose, { Connection } from 'mongoose'

declare global {
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Mongoose> | null;
    };
}

export {}

const MONGODB_URI = process.env.MONGODB_URL as string

// Ensure MONGODB_URI is defined in .env.local
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local')
}

// Cache connection state in global
let cached = global.mongoose

// If the cached object doesn't exist, initialize it with null values
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(): Promise<Connection> {
    // If there's already a cached connection, return it
    if (cached.conn) {
        console.log('Using cached MongoDB connection')
        return cached.conn
    }

    // If no connection is cached, initiate a new one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering of commands
            useNewUrlParser: true,  // Use the new URL parser (deprecated for versions >=6)
            useUnifiedTopology: true,  // Enable unified topology (recommended for MongoDB driver >=3.2)
        }

        try {
            mongoose.set('strictQuery', true) // Enforce strict query behavior
            cached.promise = mongoose.connect(MONGODB_URI, opts)
            console.log('Attempting to connect to MongoDB...')
        } catch (error) {
            console.error('Error while initiating MongoDB connection:', error)
            throw new Error('Error while initiating MongoDB connection')
        }
    }

    // Wait for the connection promise to resolve
    try {
        const mongooseInstance = await cached.promise
        cached.conn = mongooseInstance.connection  // Access the actual connection object
        console.log('MongoDB connected successfully')
    } catch (error) {
        cached.promise = null  // Reset the promise if the connection fails
        console.error('Failed to connect to MongoDB:', error)
        throw new Error('Failed to connect to MongoDB: ' + error)
    }

    return cached.conn as Connection
}

export default dbConnect
