import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

const getData = async () => {
  const response = await fetch(
    "https://www.course-api.com/react-useReducer-cart-project"
  );
  const cartData = await response.json();
  console.log(cartData);
};
getData();

/* this is replaced with the watch function in server.js
try {
  const response = await fetch(
    "https://www.course-api.com/react-useReducer-cart-project"
  );
  const cartData = await response.json();
  console.log(cartData);
} catch (error) {
  console.log(error);
}*/

/* Morgan: Log the information about the requests */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

/*
// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});
*/
