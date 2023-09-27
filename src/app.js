const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const TaskSchema = require("../models/model");
const cors = require("cors");

const app = express();

dotenv.config();

app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB Connection
const connectToDataBase = async () => {
  await mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      console.log("Connected to DB!"),
      app.listen(7070, () => console.log("Server running!"))
    );
};

connectToDataBase();

app.use(cors());

//Routes
//GET Method
app.get("/list", async (req, res) => {
  try {
    const tasks = await TaskSchema.find({});
    res.json(tasks);
  } catch {
    res.redirect("/");
  }
});

//POST Method
app.post("/", async (req, res) => {
  const todoTask = new TaskSchema({
    content: req.body.content,
  });
  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

//DELETE Method
app.delete(`/list/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    await TaskSchema.findByIdAndRemove(id);
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});
