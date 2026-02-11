import express from "express";
import "dotenv/config";
import { connectToMongo } from "./db.js";

import usersRoutes from "./userRoutes.js";
import { errorHandler } from "./handlers.js";


const app = express();
app.use(express.json());

app.use("/api/users", usersRoutes); //change?
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

async function start() {
  await connectToMongo();
  app.listen(PORT, "0.0.0.0", function () {
    console.log("Server running on port " + PORT);
  });
}
start();