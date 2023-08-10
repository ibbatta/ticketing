import mongoose from "mongoose";

import { app } from "./app";

const { APP_NAME, APP_PORT } = process.env;

const startMicroservice = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined!");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("~~> DB: connected");

    app.listen(APP_PORT, () => {
      console.log(`——— ${APP_NAME} is running on port: ${APP_PORT}`);
    });
  } catch (err) {
    console.error("--- DB ERROR: ", err);
  }
};

startMicroservice();
