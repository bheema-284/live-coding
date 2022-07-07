// Order Model


/// [
//     {code: 100, qty: 3, unitPrice: 20.00, totalAmt: 60.00}
//     {code: 101, qty: 1, unitPrice: 50.00, totalAmt: 50.00}
//     {code: 100, qty: 2, unitPrice: 20.00, totalAmt: 40.00}
//     {code: 103, qty: 5, unitPrice: 10.00, totalAmt: 50.00}
//     ]
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    code: { type: String, required: true , unique:true},
    qty: { type: Number, required: true },    
    unitPrice: { type: Number, required: true },
    totalAmt: { type: Number, required: true },  

  },
  { timestamps: true, versionKey: false },
);

const order = new mongoose.model("order", orderSchema);

module.exports = order;
