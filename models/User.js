import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_digest: {
      type: String,
      required: true,
      select: false,
    },
    savedEvent: [{ type: Schema.Types.ObjectId, ref: "events" }],
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
