const slug = require("url-slug");
const Comment = require("../../models/comment");
const Product = require("../../models/product");

exports.listComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).lean();
    const showComment = await Promise.all(
      comments.map(async (comment) => {
        const product = await Product.findOne({
          slugProduct: comment.slugProduct,
        }).lean();
        // console.log(product.title);
        return { ...comment, productName: product.title };
      })
    );
    // console.log(showComment);
    res.render("admin/ListComment", { showComment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = (req, res, next) => {
  const commentID = req.params.cmtId;
  Comment.deleteOne({ _id: commentID })
    .then((post) => {
      if (post.deletedCount > 0) {
        res
          .status(200)
          .json({ status: true, message: "Xóa Đánh Giá Thành Công" });
      } else {
        const error = new Error("Không tìm thấy Đánh Giá này");
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
