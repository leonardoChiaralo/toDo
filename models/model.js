const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
    minlength: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TaskSchema", taskSchema);
