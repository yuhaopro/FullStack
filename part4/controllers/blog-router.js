const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// only relative path is specified, ancestor path defined in app.js

// return the entire blog collection from database
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, user: 1});
  response.json(blogs);
});

// return a specific blog from the collection based on id
blogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).send("blog post not found!");
  }
  response.json(blog);
});

// save the blog post to database and return the json
blogRouter.post("/", async (request, response) => {
  // expecting a userid field
  const requiredProps = ["title", "url", "userId"];
  const missingRequiredProps = [];
  for (const prop of requiredProps) {
    if (!request.body.hasOwnProperty(prop)) {
      missingRequiredProps.push(prop);
    }
  }

  if (missingRequiredProps.length > 0) {
    return response.status(400).json({
      error: "Missing required properties: " + missingRequiredProps.join(", "),
    });
  }

  if (!request.body.hasOwnProperty("likes")) {
    request.body.likes = 0;
  }

  const user = await User.findById(request.body.userId);
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

// deleting a single blog post
blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  return response.status(204).end();
});

// update single blog post
blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});
module.exports = blogRouter;
