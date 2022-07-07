const Order = require("../Models/order.models");
const express = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(200).send(order);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const order = await Order.find().lean().exec();
    return res.status(200).send(order);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(200).send(order);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(order);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(order);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
