require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();


app.get("/", (req, res) => {
  res.json({ msg: "welcome to app" });
});

app.use((req,res,next) => {
  console.log(req.path, res.method)
  next()
})

app.use(express.json())
app.use('/api/user',authRoute)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log("listening on port 4000");
  });
})
.catch((error) => {
  console.log(error)
})

