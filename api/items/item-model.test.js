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
});
