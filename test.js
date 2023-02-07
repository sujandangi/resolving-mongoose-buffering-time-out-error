const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MUST: middleware to parse the POST request (ex. req.body)
app.use(express.json());

// to suppress the warning
mongoose.set("strictQuery", true);

//if having issue while connecting with MongoDB try replacing "localhost:27017" with "127.0.0.1:27017"
mongoose.connect("mongodb://127.0.0.1:27017", (err) => {
  if (err) console.log("CONNECTION ERROR: ", err);
  else console.log("MONGODB CONNECTED SUCCESSFULLY");
});

// Define the MongoDB Schema for the "users" collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  password: String,
});

// Create the MongoDB Model for the "users" collection
const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("I am the get /");
});

app.post("/register", async (req, res) => {
  //console.log("REQUEST BODY: ", req.body)
  try {
    const newUser = new User(req.body)
    console.log("NEW USER: ", newUser)

    await newUser.save(); //save the user to the database
    res.status(200).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
