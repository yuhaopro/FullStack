const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initial } = require("lodash");
const api = supertest(app);
// define starting state
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
// initialize database

beforeEach(async () => {
  // delete all blogs
  await Blog.deleteMany({});

  // add blogs in initialBlogs
  for (const blog of initialBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
    console.log("saved");
  }
});

// test cases
test("number of notes returned correctly", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("id property exists", async () => {
  const response = await api.get("/api/blogs");
  for (const blog of response.body) {
    console.log("object obtained", blog);
    expect(blog.id).toBeDefined();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
