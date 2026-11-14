import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
