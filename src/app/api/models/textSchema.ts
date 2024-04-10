import mongoose from "mongoose";

const textSchema = new mongoose.Schema(
  {
    data: {
      type: String,
    },
    code: {
      type: Number,
      unique: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Text = mongoose.models.Text || mongoose.model("Text", textSchema);
