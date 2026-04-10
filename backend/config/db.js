import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://prashantsahu120503_db_user:<1T11EdvtuR0BqJEa>@cluster0.7tzgmt6.mongodb.net/?appName=Cluster0");
        console.log("mongoDB connected");
    }
    catch (error) {
        console.error(error)
        process.exit(1);
    }
}

export default connectDB;