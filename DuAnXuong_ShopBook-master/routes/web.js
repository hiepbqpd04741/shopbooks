const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");
const indexController = require("../controllers/index");
const Category = require("../models/category");

// check login
function checkLoggedIn(req, res, next) {
  if (!req.session.loggedin) {
    return res.redirect("/login");
  }
  next();
}

router.get("/", indexController.getIndex);
router.get("/detail/:slug", indexController.getDetail);
router.post("/postComment", indexController.postComment);
router.post("/updateComment", indexController.updateComment);
router.post("/deleteComment", indexController.deleteComment);
router.post("/addToCart", indexController.addToCart);
router.get("/cart", indexController.viewCart);
router.post("/updateCart", indexController.updateCart);
router.post("/deleteCart", indexController.deleteCart);
router.get("/checkout", checkLoggedIn, indexController.getviewCheckOut);
router.post("/orderCart", indexController.orderCart);

router.get("/listOrder", checkLoggedIn, indexController.getListOrder);
router.get(
  "/detailOrder/:codeOrder",
  checkLoggedIn,
  indexController.getDetailOrder
);
router.get("/statusOrder/:id", checkLoggedIn, indexController.getStatusComplete);


router.get("/categories/:slug", indexController.getProductOfCategory);




router.get("/register", async (req, res, next) => {
  const categories = await Category.find({});
  res.render("auth/register", { categories: categories });
});

router.get("/login", async (req, res, next) => {
  const categories = await Category.find({});
  res.render("auth/login", { categories: categories });
});
router.get("/resetpassword", async (req, res, next) => {
  const categories = await Category.find({});
  res.render("auth/resetpassword", { categories: categories });
});
router.post("/postCreateUser", userController.createUser);
router.post("/postLoginUser", userController.loginUser);
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
