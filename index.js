require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
const characterRoutes = require("./routes/character");

app.use(cors());
app.use(formidable());
app.use(characterRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on Star Wars API" });
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Unknown route" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started on port : " + process.env.PORT);
});
