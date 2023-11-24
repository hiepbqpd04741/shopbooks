const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/product/:isbn", apiController.apiGetISBN);
router.get("/products", apiController.apiGetProducts);
router.get("/categories", apiController.apiGetCategories);

module.exports = router;
