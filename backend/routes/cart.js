const express = require('express')
const Cart = require('../models/CartModel')
const router = express.Router()

router.post('/add',async (req,res) => {
  const {emailId, name, price, sale, image} = req.body;
  try {
    const auth = await Cart.create({emailId, name, price, sale, image});
    res.status(200).json(auth);
  } catch (error) {
    res.status(400).json({error: error.message})
    console.log(error);
  }
})

router.get('/get',async (req,res) => {
  const cart = await Cart.find({})
  if (!cart) {
    return res.status(404).json({error:"no products"})
  }
  res.status(200).json(cart)
})

module.exports = router