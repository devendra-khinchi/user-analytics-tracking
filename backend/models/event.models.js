import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
  },
  event_type: {
    type: String,
    required: true,
  },
  page_url: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  x: Number,
  y: Number,
});

export default mongoose.model("Event", eventSchema);
