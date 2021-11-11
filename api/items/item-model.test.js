const Item = require("./item-model");
const db = require("../../data/db-config");
const { items } = require("../../data/seeds/01-initial-items");

test("is testing environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("item Model", () => {
  describe("findAll", () => {
    let data;
    beforeEach(async () => {
      data = await Item.findAll();
    });

    test("resolves items in db", async () => {
      expect(data).toHaveLength(7);
    });
    test("resolves to correct shape", () => {
      expect(data).toMatchObject(items);
    });
  });

  describe("getById()", () => {
    test("returns the correct item", async () => {
      const data = await Item.getById("1");
      expect(data).toMatchObject({ item_id: 1, item_name: "box" });
    });
  });

  describe("postItem(", () => {
    test("returns inserted item", async () => {
      const newItem = { item_name: "glue" };
      const data = await Item.postItem(newItem);
      expect(data).toMatchObject(newItem);
    });
  });
});
