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

// new blog to be added
const newBlog = {
  title: "puppy",
  author: "johnny",
  url: "john.com",
  likes: 145,
};

test("blog created correctly", async () => {
  // create blog
  await api.post("/api/blogs").send(newBlog);
  const response = await api.get("/api/blogs");
  // console.log("body length", response.body.length);
  expect(response.body).toHaveLength(initialBlogs.push(newBlog));
});

const missingLikesBlog = {
  title: "snooch",
  author: "qwq",
  url: "aaa.com",
};

test("likes property missing during post", async () => {
  const response = await api.post("/api/blogs").send(missingLikesBlog);
  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

const missingTitleAndUrlBlog = {
  author: "bruh",
};

test("missing title and url", async () => {
  const response = await api
    .post("/api/blogs")
    .send(missingTitleAndUrlBlog)
    .expect(400);
  console.log(response);
});

afterAll(async () => {
  await mongoose.connection.close();
});
