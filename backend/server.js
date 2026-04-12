import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.js";
import Message from "./models/Message.js";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(cors({
    origin: "https://chat-me-2-zymj.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.options("*", cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

const users = [];
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chat-me-2-zymj.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],

    },
})

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("no token"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        socket.user = decoded;
        next();

    } catch (err) {
        next(new Error("Invalid Token"));
    }
})

io.on("connection", (socket) => {

    socket.on("joinroom", async ({ room }) => {

        const username = socket.user.username;

        const existingUser = users.findIndex(u => u.username === username && u.room === room);
        if (existingUser !== -1) {
            users.splice(existingUser, 1);
        }

        const user = {
            id: socket.id,
            username,
            room
        }
        users.push(user)

        socket.rooms.forEach(r => {
            if (r !== socket.id) {
                socket.leave(r);
            }
        })
        socket.join(room)


        const rooms = [...new Set(users.map(u => u.room))]
        io.emit("rooms", rooms);


        const roomUsers = users.filter(user => user.room === room);
        io.to(room).emit("roomUsers", roomUsers)

        const messages = await Message.find({ room });
        socket.emit("previousMessages", messages)
    });

    socket.on("sendMessage", async (data) => {

        try {
            const username = socket.user.username;
            const newMessage = {
                username,
                message: data.message,
                room: data.room,
                time: new Date().toISOString()
            }
            await Message.create(newMessage);
            io.to(data.room).emit("recieveMessage", newMessage);
            console.log(data);

        } catch (err) {
            console.error(`Message not sent:${err}`)
        }


    })

    socket.on("disconnect", () => {
        const user = users.find(u => u.id === socket.id);

        if (!user) return;

        const index = users.findIndex(u => u.id === socket.id);
        users.splice(index, 1);
        const roomUsers = users.filter(u => u.room === user.room);
        io.to(user.room).emit("roomUsers", roomUsers);
        console.log(`${user.username} disconnected`);

    })
})


server.listen(PORT, () => {
    console.log("Server running on port 5000")
})