const express = require("express");
const router = express.Router();

const { addProduct, getProduct } = require("../controllers/ProductController");

router.post("/add", addProduct);

router.get("/get", getProduct);

module.exports = router;
