import mongoose from "mongoose";

// "Item" is a placeholder: rename it and change the fields to match
// your project (Survey, Incident, Book, Appointment, ...).
const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: "open",
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model("Item", ItemSchema);
