import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    phone: {type: String, required: true, match: /\(\d{3}\) \d{3}-\d{4}/},
    address: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
  },
  { collection: "users" }
);

export default mongoose.model("User", userSchema);