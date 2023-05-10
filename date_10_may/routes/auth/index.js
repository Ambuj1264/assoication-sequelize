const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/productController");

router.post("/product", productController.create);
router.post("/productAll", productController.getAll);
router.post("/product/filter", productController.filterProduct);

module.exports = router;
