const slug = require("url-slug");
const Product = require("../../models/product");
const Category = require("../../models/category");
const Comment = require("../../models/comment");

exports.listProduct = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    const products = await Product.find({});
    // loop
    for (let product of products) {
      const totalComment = await Comment.count({
        slugProduct: product.slugProduct,
      });
      const result = await Comment.aggregate([
        { $match: { slugProduct: product.slugProduct } },
        { $group: { _id: "$slugProduct", totalRating: { $sum: "$rating" } } },
      ]);

      const totalRating = result.length > 0 ? result[0].totalRating : 0;
      product.review_count = totalComment; // lấy ra rồi update thôi

      console.log("Tổng Comment :", product.review_count);
      console.log("Tổng Rating :", totalRating);
      // tb
      const averageComment = totalRating / totalComment;

      product.average_score = averageComment.toFixed(0);

      product.save();
      console.log(`Trung Bình Comment "${product.title}" : ${averageComment}`);
    }
    // console.log(products);
    res.render("admin/ListProducts", {
      showCategories: categories,
      showProduct: products,
    });
  } catch (error) {
    next(error);
  }
};
exports.addProduct = (req, res, next) => {
  let title = req.body.title;
  let author = req.body.author;
  let price = req.body.price;
  let image = req.body.image;
  let year = req.body.year;
  let isbn = req.body.isbn;
  let review_count = req.body.review_count;
  let average_score = req.body.average_score;
  let describeProduct = req.body.describeProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let categoryName = req.body.categoryName;
  let slugProduct = slug(title);
  if (
    title == "" ||
    author == "" ||
    price == "" ||
    image == "" ||
    year == "" ||
    isbn == "" ||
    average_score == "" ||
    describeProduct == "" ||
    descriptionProduct == "" ||
    categoryName == ""
  ) {
    res.status(200).json({ status: false, message: "Không Được Để Trống" });
  } else {
    const products = new Product({
      title,
      slugProduct,
      author,
      price,
      image,
      year,
      isbn,
      review_count: "0",
      average_score,
      describeProduct,
      descriptionProduct,
      categoryName,
    });
    // console.log("Product : ", products);
    products
      .save()
      .then((result) => {
        res.redirect('/admin/product');
        
        
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};

exports.updateProduct = (req, res, next) => {
  console.log(req.body);
  let productId = req.params.productId;
  let title = req.body.title;
  let author = req.body.author;
  let price = req.body.price;
  let image = req.body.image;
  let year = req.body.year;
  let isbn = req.body.isbn;
  let average_score = req.body.average_score;
  let describeProduct = req.body.describeProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let categoryName = req.body.categoryName;
  let slugProduct = slug(title);
  Product.findById(productId)
    .then((data) => {
      data.title = title;
      data.author = author;
      data.price = price;
      data.image = image;
      data.year = year;
      data.isbn = isbn;
      data.average_score = average_score;
      data.describeProduct = describeProduct;
      data.descriptionProduct = descriptionProduct;
      data.categoryName = categoryName;
      data.slugProduct = slugProduct;
      return data.save();
    })
    .then((result) => {
        res.redirect('/admin/product');
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteOne({ _id: productId })
    .then((post) => {
      if (post.deletedCount > 0) {
        res.redirect('/admin/product');
      } else {
        const error = new Error("Không tìm thấy sản phẩm này");
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


