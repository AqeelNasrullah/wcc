import mongoose from "mongoose";

const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    isExpired: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const ForgotPassword =
  mongoose.models.ForgotPassword ||
  mongoose.model("ForgotPassword", forgotPasswordSchema);

export default ForgotPassword;
