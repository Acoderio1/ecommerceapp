require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "welcome to app" });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
