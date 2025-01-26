import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required!"],
    },
    password: {
        type: String,
        required: [true, "password is required!"],
    },
    about: {
        type: String,
    },
    profileUrl: {
        type: String,
    },
});

export const User = mongoose.models.user || mongoose.model("user", userSchema);