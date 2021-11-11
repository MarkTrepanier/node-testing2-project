// DO NOT CHANGE THIS FILE
const items = [
  { item_name: "box" },
  { item_name: "quilt" },
  { item_name: "broom" },
  { item_name: "dryer" },
  { item_name: "leash" },
  { item_name: "bag" },
  { item_name: "sword" },
];

exports.items = items;

exports.seed = function (knex) {
  return knex("items").insert(items);
};
