import express, { Request, Response } from "express";
import { json } from "body-parser";
import "express-async-errors";

const app = express();
app.use(json());

const { APP_NAME, APP_PORT } = process.env;

app.get("/api/orders", (req: Request, res: Response) => {
  res.send(`${APP_NAME}: ~ hello wordl!`);
});

const startMicroservice = async () => {
  app.listen(APP_PORT, () => {
    console.log(`——— ${APP_NAME} is running on port: ${APP_PORT}`);
  });
};

startMicroservice();
