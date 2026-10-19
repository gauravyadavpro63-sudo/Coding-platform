import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
      unique: true,
    },

    cloudinaryAssetId: {
      type: String,
      required: true,
      unique: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    format: {
      type: String,
      required: true,
    },

    bytes: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);