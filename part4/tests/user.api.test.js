const bycrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Helper = require("../utils/list_helper");
const { initial } = require("lodash");
const mongoose = require("mongoose");
const config = require("../utils/config");

let server;
beforeAll(() => {
  server = app.listen(config.PORT);
});

describe("initially one user in db", () => {
  beforeEach(async () => {
    // clear the User collection
    await User.deleteMany({});
    const passwordHash = await bycrypt.hash("123456", 10);
    const user = new User({ username: "root", name: "root", passwordHash });
    await user.save();
  });

  test("creation of user successful", async () => {
    const initialDb = await Helper.allUsers();

    // Add one User into collection
    const newUser = {
      username: "dog",
      name: "dog",
      password: "12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const afterDb = await Helper.allUsers();
    expect(afterDb).toHaveLength(initialDb.length + 1);

    const usernames = afterDb.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("duplicated username", async () => {
    const usersAtStart = await Helper.allUsers();
    // Add one User into collection
    const newUser = {
      username: "root",
      name: "root",
      password: "12345",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");
    const usersAtEnd = await Helper.allUsers();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  console.log("Closing mongo");
  clearTimeout();
  clearInterval();
  await mongoose.connection.close();
});
