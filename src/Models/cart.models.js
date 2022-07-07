// Cart Model


//{code: 100, name: Popcorn, unitPrice: 20.00}
// {code: 101, name: French Fries, unitPrice: 50.00}
// {code: 103, name: Coke, unitPrice: 10.00}
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    code: { type: String, required: true , unique:true},
    name: { type: String, required: true },
    price: { type: String, required: true },
    qty: { type: Number, required: true },    
  },
  { timestamps: true, versionKey: false },
);

const cart = new mongoose.model("items", cartSchema);

module.exports = cart;
