import mongoose, { mongo } from "mongoose";

let isConnected = false; //track connection status


export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('mongooseDB is already Connected');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log('MongoDB connected');
    } catch(error) {
        console.log(error)
    }
}