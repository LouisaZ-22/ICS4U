import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // stuff
  },
  { collection: "users" }
);

export default mongoose.model("User", userSchema);