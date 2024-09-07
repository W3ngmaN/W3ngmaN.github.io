import mongoose from 'mongoose';
import 'dotenv/config' 

async function connect(){
    await createConnection();
    console.log("Successfully connected to MongoDB using Mongoose!");
};

async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {});
    return mongoose.connection;
};

export { connect };
