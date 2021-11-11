const db = require("../../data/db-config");

function findAll() {
  return db("items");
}

module.exports = {
  findAll,
};
