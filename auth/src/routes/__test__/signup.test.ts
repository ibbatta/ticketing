import request from "supertest";

import { app } from "../../app";

describe("SIGNUP TEST", () => {
  it("Returns a 201 on successful signup", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1234" })
      .expect(201);
  });

  it("Returns a 400 with an invalid email", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test", password: "1234" })
      .expect(400);
  });

  it("Returns a 400 with an invalid password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "12" })
      .expect(400);
  });

  it("Returns a 400 missing email and password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.it",
      })
      .expect(400);

    await request(app)
      .post("/api/users/signup")
      .send({
        password: "1234",
      })
      .expect(400);
  });

  it("Not allows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1234" })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1234" })
      .expect(400);
  });

  it("Sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1234" })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
