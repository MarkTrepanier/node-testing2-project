const db = require("../../data/db-config");

function findAll() {
  return db("items");
}

function getById(item_id) {
  return db("items").where("item_id", item_id).first();
}

async function postItem(item) {
  return db("items")
    .insert(item)
    .then(([item_id]) => {
      return getById(item_id);
    });
}

module.exports = {
  findAll,
  postItem,
  getById,
};
