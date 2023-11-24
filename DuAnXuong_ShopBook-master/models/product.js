const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slugProduct: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    review_count: {
      type: String,
      required: true,
    },
    average_score: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    describeProduct: {
      type: String,
      required: true,
    },
    descriptionProduct: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", postSchema);
