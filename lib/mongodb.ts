import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // const options = { 
    //     dbName: 'saas_ai',
    //     bufferCommands: false,
    //     authSource: "admin", 
    //     connectTimeoutMS: 5000, 
    //     socketTimeoutMS: 20000, 
    //     heartbeatFrequencyMS: 10000, 
    //     retryWrites: true, 
    //     w: "majority", 
    // }; 

    if(isConnected) {
        console.log('MongoDB is already connected')
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI;

        await mongoose.connect((mongoUri), {
            dbName: 'saas_ai',
            bufferCommands: false,
            authSource: "admin", 
            connectTimeoutMS: 5000, 
            socketTimeoutMS: 20000, 
            heartbeatFrequencyMS: 10000, 
            retryWrites: true, 
            w: "majority", 
        });

        isConnected = true;

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error);    
    }
}

export default connectToDB