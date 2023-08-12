import request from "supertest";

import { app } from "../../app";

describe("CURRENT USER TEST", () => {
  it("it responds with the current user details", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .get("/api/users/current")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser).toBeDefined();
    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  it("Responds with null if not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .send()
      .expect(200);

    expect(response.body.currentUser).toBeNull();
  });
});
