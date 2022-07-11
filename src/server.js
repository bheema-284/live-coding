// Influx - Node.js assignment-II
// Short summary of what you need to do
// Create an express based application with a couple of REST api’s to manage a simple cart.
// Deep Dive
// 1. Create a REST API to add items to an “itemMaster” array.
// a. POST <baseurl>/items
// Payload:
// {
// code: 100,
// name:"Popcorn",
// price: 20.00
// }
// b. Code should be unique for each item.
// c. It should be possible to add one or more items to the “itemMaster” array.
// d. Eg:
// [
// {code: 100, name: Popcorn, unitPrice: 20.00}
// {code: 101, name: French Fries, unitPrice: 50.00}
// {code: 103, name: Coke, unitPrice: 10.00}
// ]

// 2. Create a REST API to add items to a “userCart” array
// a. POST <baseurl>/order/<orderId>
// Payload: { code: 100, qty: 3 }
// b. Validation should be done based on “code”. If the given code is not found in the
// “itemMaster” array, then an error response should be returned.
// c. The final object that should be added to “userCart” should have the following
// structure:
// { code: 100, qty: 3, unitPrice: 20.00, totalAmt: 60.00 }
// d. unitPrice should be fetched from “itemMaster” based on code
// e. totalAmt = qty * unitPrice
// f. It should be possible to add one or more items to the same orderid.
// g. If the same item is added twice, then there should be two separate objects in
// the “userCart’
// h. Example data in “userCart” array
// [
//     {code: 100, qty: 3, unitPrice: 20.00, totalAmt: 60.00}
//     {code: 101, qty: 1, unitPrice: 50.00, totalAmt: 50.00}
//     {code: 100, qty: 2, unitPrice: 20.00, totalAmt: 40.00}
//     {code: 103, qty: 5, unitPrice: 10.00, totalAmt: 50.00}
//     ]



// const express = require('express');
// const mongoose = require('mongoose');
// const connect = require('./Configs/db');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 8080
// app.use(cors());
// app.use(express.json());

// const CartData = require('./Controllers/cart.controller');
// const OrderData = require('./Controllers/order.controller')
// app.use('/items', CartData);
// app.use('/order')
// app.listen(port, async () => {
//   await connect();
//   console.log("Listining to the  port ", port);
// });





const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 2345;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let itemMaster = [];
let userCart = [];

//create a REST API to add items to an "itemMaster" array
//POST /api/items
//payload : {
//code : 100,
//name : "Popcorn",
//price : 20.00
//}

app.post("/api/items", (req, res) => {
  let item = req.body;
  if (itemMaster.find((i) => i.code === item.code)) {
    res.status(400).send("Item already exists");
  } else {
    itemMaster.push(item);
    res.send(itemMaster);
  }
});

//GET /api/items

app.get("/api/items", (req, res) => {
  res.send(itemMaster);
});

// ----------------------------------------------------------------------------------------------------------------------

// 2. Create a REST API to add items to a “userCart” array
// a. POST api/order/<orderId>
// Payload: { code: 100, qty: 3 }

app.post("/api/order/:orderId", (req, res) => {
  let item = req.body;
  let orderId = req.params.orderId;
  if (!itemMaster.find((i) => i.code === item.code)) {
    res.status(400).send("Item does not exist");
  } else {
    let itemToAdd = {
      code: item.code,
      qty: item.qty,
      unitPrice: itemMaster.find((i) => i.code === item.code).price,
      totalAmt: item.qty * itemMaster.find((i) => i.code === item.code).price,
    };
    if (userCart.find((i) => i.orderId === orderId)) {
      userCart.find((i) => i.orderId === orderId).items.push(itemToAdd);
    } else {
      userCart.push({
        orderId: orderId,
        items: [itemToAdd],
      });
    }
    res.send(userCart);
  }
});

// ----------------------------------------------------------------------------------------------------------------------

//3. create a REST API to summarize items in the “userCart” array
//a. GET api/order/<orderId>/summarize

app.get("/api/order/:orderId/summarize", (req, res) => {
  let orderId = req.params.orderId;
  let items = userCart.find((i) => i.orderId === orderId).items;
  let summarizedItems = [];
  let itemCode = items[0].code;
  let qty = 0;
  let totalAmt = 0;
  for (let i = 0; i < items.length; i++) {
    if (itemCode === items[i].code) {
      qty += items[i].qty;
      totalAmt += items[i].totalAmt;
    } else {
      summarizedItems.push({
        code: itemCode,
        qty: qty,
        unitPrice: itemMaster.find((i) => i.code === itemCode).price,
        totalAmt: totalAmt,
      });
      itemCode = items[i].code;
      qty = items[i].qty;
      totalAmt = items[i].totalAmt;
    }
  }
  summarizedItems.push({
    code: itemCode,
    qty: qty,
    unitPrice: itemMaster.find((i) => i.code === itemCode).price,
    totalAmt: totalAmt,
  });
  res.send(summarizedItems);
});

// ----------------------------------------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
