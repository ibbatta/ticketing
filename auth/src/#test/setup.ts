import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { app } from "../app";

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
