import express, { Request, Response } from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";

const { APP_NAME } = process.env;

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get("/api/users", (req: Request, res: Response) => {
  res.send(`${APP_NAME}: ~ hello wordl!`);
});

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
