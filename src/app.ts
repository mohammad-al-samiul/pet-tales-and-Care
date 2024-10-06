import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

import routeNotFound from "./app/middlewares/routeNotFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// global error handler
app.use(globalErrorHandler);

// handle api route not found
app.use(routeNotFound);

export default app;
