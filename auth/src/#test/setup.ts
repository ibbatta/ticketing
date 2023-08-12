import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongoMemory: any;
beforeAll(async () => {
  process.env.JWT_KEY = "jwt-test-key";

  mongoMemory = await MongoMemoryServer.create();
  const mongoUri = mongoMemory.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongoMemory) {
    await mongoMemory.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "1234";

  await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "1234" })
    .expect(200);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
