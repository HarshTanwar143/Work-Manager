import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "task name is required!"],
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: [true, "content is required!"],
    },
    status: {
        enum: ["pending", "completed"],
        default: "pending",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

export const Task = mongoose.models.task || mongoose.model("task", taskSchema);


