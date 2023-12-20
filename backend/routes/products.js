const express = require('express')
const Product = require('../models/ProductModel')
const router = express.Router()

router.post('/add',async (req,res) => {
  const {type, images, name, price, description, bestseller, sale} = req.body;
  console.log(req.body)
  try {
    const auth = await Product.create({type, images, name, price, description, bestseller, sale});
    // await Product.updateOne({ $push: { images: images }})
    res.status(200).json(auth);
  } catch (error) {
    res.status(400).json({error: error.message})
    // console.log(error);
  }
})

router.get('/get',async (req,res) => {
  const products = await Product.find({bestseller: false}).limit(req.query.limit)
  console.log(req.query.limit)
  if (!products) {
    return res.status(404).json({error:"no products"})
  }
  res.status(200).json(products)
})

// router.get('/get',async (req,res) => {
//   const products = await Product.find({})
//   if (!products) {
//     return res.status(404).json({error:"no products"})
//   }
//   res.status(200).json(products)
// })

module.exports = router