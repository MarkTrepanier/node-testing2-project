const server = require("./server");
const request = require("supertest");
const db = require("../data/db-config");
const { items } = require("../data/seeds/01-initial-items");

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

describe("[GET] api/items", () => {
  test("responds with items", async () => {
    const res = await request(server).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(7);
  });
  test("return follows shape", async () => {
    const res = await request(server).get("/api/items");
    expect(res.body).toMatchObject(items);
  });
});
