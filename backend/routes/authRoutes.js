import User from "../models/User.js";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already Exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(200).json({ message: "User Created Successfully!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ message: "User not Found !!" })
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) {
            return res.status(400).json({ meassage: "Password Does not Match !!" });
        }

        const token = jwt.sign({
            userId: existingUser._id,
            username: existingUser.username,
        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" });
        console.log(process.env.JWT_SECRET);
        console.log("hi youve stopperd")

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: existingUser._id,
                username
            }
        });

    } catch (err) {

        res.status(500).json({ message: err.message });
    }
})

export default router;