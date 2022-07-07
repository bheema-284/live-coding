const Cart = require("../Models/cart.models");
const express = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const cart = await Cart.find().lean().exec();
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
