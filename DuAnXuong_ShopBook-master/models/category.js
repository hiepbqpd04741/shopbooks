const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true, // đảm bảo tên k trùng lăp
    },
    categorySlug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", postSchema);
