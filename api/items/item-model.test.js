const Item = require("./item-model");
const db = require("../../data/db-config");
const { items } = require("../../data/seeds/initial-items");

test("is testing environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});
