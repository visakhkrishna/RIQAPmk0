// Server file
import * as dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { nanoid } from "nanoid";
const app = express();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data recieved", data: req.body });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5100, () => {
  console.log("The Server is running");
});
