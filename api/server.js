const express = require("express");

const server = express();

server.use(express.json());

const Item = require("./items/item-model");

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/api/items", (req, res) => {
  Item.findAll()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = server;
