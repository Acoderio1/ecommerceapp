const Product = require("../models/ProductModel");

const addProduct = async (req, res) => {
  const { type, images, name, price, description, bestseller, sale } = req.body;
  console.log(req.body);
  try {
    const auth = await Product.create({
      type,
      images,
      name,
      price,
      description,
      bestseller,
      sale,
    });
    res.status(200).json(auth);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  const excludeFields = ["limit"];
  const querObj = {...req.query};
  excludeFields.forEach((item) => {
    delete querObj[item];
  })
  const products = await Product.find(querObj).limit(req.query.limit);
  if (!products) {
    return res.status(404).json({ error: "no products" });
  }
  res.status(200).json(products);
};

module.exports = {
  addProduct,
  getProduct,
};
