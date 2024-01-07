const express = require('express')
const Cart = require('../models/CartModel')
const Auth = require('../models/AuthModel')
const router = express.Router()

router.post('/add',async (req,res) => {
  const {emailId, name, amount, image} = req.body;
  try {
    const cart = await Cart.create({emailId, name, amount, image});
    // const auth = await Auth.updateOne()
    res.status(200).json(cart);
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