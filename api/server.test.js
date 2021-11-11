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

describe("[GET] api/items/:item_id", () => {
  test("responds with correct item", async () => {
    const res = await request(server).get("/api/items/1");
    expect(res.body).toMatchObject({ item_name: "box" });
  });
});

describe("[POST] api/items", () => {
  test("responds with new Item", async () => {
    const res = await request(server)
      .post("/api/items")
      .send({ item_name: "kevlar" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ item_name: "kevlar" });
  });
  test("new item extends api by 1", async () => {
    await request(server).post("/api/items").send({ item_name: "kevlar" });
    const res = await request(server).get("/api/items");
    expect(res.body).toHaveLength(8);
  });
});
