const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    require: true,
    type: String,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

exports.Category = mongoose.model("Category", categorySchema);
