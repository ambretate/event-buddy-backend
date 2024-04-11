import mongoose from "mongoose";

const Schema = mongoose.Schema;

let EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
  },
  minPrice: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
  city: {
    type: String,
  },
  ticketURL: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  featured: {
    type: Boolean,
  },
});

export default mongoose.model("events", EventSchema);
