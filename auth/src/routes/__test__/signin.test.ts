import request from "supertest";

import { app } from "../../app";

describe("SIGNIN TEST", () => {
  it("Fails when an email that does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "1234" })
      .expect(400);
  });

  it("Fails when an incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1234" })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "0987" })
      .expect(400);
  });

  it("Responds with a cookie when given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1234" })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "1234" })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
