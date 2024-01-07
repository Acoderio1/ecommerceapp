const express = require('express')
const Auth = require('../models/AuthModel')
const router = express.Router()

router.post('/register',async (req,res) => {
  const {_id, emailId, fullName, cart} = req.body;
  try {
    const auth = await Auth.create({_id,fullName, emailId, cart});
    res.status(200).json(auth);
  } catch (error) {
    res.status(400).json({error: error.message})
    console.log(error);
  }
})

module.exports = router