import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chatapp");
        console.log("mongoDB connected");
    }
    catch (error) {
        console.error(error)
        process.exit(1);
    }
}

export default connectDB;