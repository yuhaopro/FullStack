const bycrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Helper = require("../utils/list_helper");
const { initial } = require("lodash");
const mongoose = require("mongoose");
const config = require("../utils/config");
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "doggy",
    author: "Sam",
    url: "google.com",
    likes: 50,
  },
  {
    title: "catty",
    author: "Tom",
    url: "toom.com",
    likes: 20,
  },
];

describe("initially one user in db", () => {
  beforeEach(async () => {
    // clear the User collection
    await User.deleteMany({});
    const passwordHash = await bycrypt.hash("123456", 10);
    const user = new User({ username: "root", name: "root", passwordHash });
    const savedUser = await user.save();

    await Blog.deleteMany({});

    console.log("SAVED USER", savedUser);
    // add blogs in initialBlogs based on the created user
    for (const blog of initialBlogs) {
      blog.userId = savedUser._id;
      console.log(blog);
      await api.post("/api/blogs").send(blog);
    }
  });

  test("display user information in get blogs", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).toHaveLength(initialBlogs.length);
    console.log("RESPONSE", response.body);

    // Check if user information is populated in the first blog
    // Adjust these assertions based on how your user data is structured
    const firstBlog = response.body[0];
    expect(firstBlog.user).toBeDefined();
    expect(firstBlog.user.username).toBe("root");
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

  test("no password", async () => {
    const usersAtStart = await Helper.allUsers();
    // Add one User into collection
    const newUser = {
      username: "shit",
      name: "shit",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    console.log("ERROR", result.body.error);

    expect(result.body.error).toContain("Password is required!");
    const usersAtEnd = await Helper.allUsers();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("password length < 3", async () => {
    const usersAtStart = await Helper.allUsers();
    // Add one User into collection
    const newUser = {
      username: "root",
      name: "root",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password must be longer than 3 characters!"
    );
    const usersAtEnd = await Helper.allUsers();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("no username", async () => {
    const usersAtStart = await Helper.allUsers();
    // Add one User into collection
    const newUser = {
      name: "root",
      password: "123",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("Username is required!");
    const usersAtEnd = await Helper.allUsers();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("username length < 3", async () => {
    const usersAtStart = await Helper.allUsers();
    // Add one User into collection
    const newUser = {
      username: "ro",
      name: "root123",
      password: "123",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Username must be at least 3 characters long!"
    );
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
