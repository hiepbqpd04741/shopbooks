const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    slugProduct: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // để đảm bảo rằng các tên người dùng không trùng lặp
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", postSchema);
