const blogRouter = require("express").Router();
const Blog = require("../models/blog");

// only relative path is specified, ancestor path defined in app.js

// return the entire blog collection from database
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
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
  const requiredProps = ["title", "url"];
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
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

// deleting a single blog post
blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  return response.status(204).end();
});

module.exports = blogRouter;
