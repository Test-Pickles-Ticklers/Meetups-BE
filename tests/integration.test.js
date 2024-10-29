require("dotenv").config();
const request = require("supertest");
const { server, startServer, closeServer } = require("../server");

beforeAll(async () => {
  await startServer();
});

describe("Server Startup Test", () => {
  it("should start the server and respond to a GET request", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await closeServer();
});
