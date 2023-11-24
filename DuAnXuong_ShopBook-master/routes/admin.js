const express = require("express");
const User = require("../models/user");
let router = express.Router();
const indexController = require("../controllers/admin/index");
const categoryController = require("../controllers/admin/category");
const productController = require("../controllers/admin/product");
const commentController = require("../controllers/admin/comment");

// phân quyền
async function requireAdmin(req, res, next) {
  const sessionEmail = req.session.email;
  const token = req.body.token;
  if (sessionEmail) {
    try {
      const user = await User.findOne({ email: sessionEmail });
      if (!user) {
        return res.status(200).json({
          status: false,
          message: "Tài khoản không tồn tại",
        });
      }
      if (user.level === "admin") {
        next();
      } else {
        res.status(403).send("Liên Hệ 0999999999");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else if (token) {
    try {
      const user = await User.findOne({ token: token });
      if (!user) {
        return res.status(200).json({
          status: false,
          message: "Tài khoản không tồn tại",
        });
      }
      if (user.level === "admin") {
        next();
      } else {
        res.status(403).send("Liên Hệ 0999999999");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  } else {
    res.render("404");
  }
}
// ====================== User ========================= //
router.get("/ListUsers", requireAdmin, indexController.getListUser);
router.post(
  "/updateUser/:id",
  requireAdmin,
  indexController.updateUser
);
// ====================== Home ========================= //
router.get("/", requireAdmin, indexController.getAdmin);
// ====================== category  ====================== //
router.get("/category", requireAdmin, categoryController.listCategory);
router.post("/addCategory", requireAdmin, categoryController.addCategory);
router.post(
  "/updateCategory/:cateId",
  requireAdmin,
  categoryController.updateCategory
);
router.post("/deleteCategory/:cateId", categoryController.deleteCategory);
// ====================== product  ====================== //
router.get("/product", requireAdmin, productController.listProduct);
router.post("/addProduct", requireAdmin, productController.addProduct);
router.post(
  "/updateProduct/:productId",
  requireAdmin,
  productController.updateProduct
);
router.post(
  "/deleteProduct/:productId",
  requireAdmin,
  productController.deleteProduct
);

// ====================== list orders  ====================== //

router.get("/listOrder", requireAdmin, indexController.getListOrder);
router.get(
  "/detailOrder/:codeOrder",
  requireAdmin,
  indexController.getDetailOrder
);

router.get("/updateOrder/:id", requireAdmin, indexController.updateOrder);

// ====================== Comment ========================= //

router.get("/listComment", requireAdmin, commentController.listComment);
router.get("/deleteComment/:cmtId", requireAdmin, commentController.deleteComment);

module.exports = router;
