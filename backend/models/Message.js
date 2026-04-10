import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    room: String,
    time: String
});

export default mongoose.model("Message", messageSchema);