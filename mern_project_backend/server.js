import "dotenv/config"; // must be first so .env is loaded before config.js is read
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.error("Database connection error:", err.message));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.info("Server started on port %s.", config.port);
});
