const blogRouter = require("express").Router();
const Blog = require("../models/blog");

// only relative path is specified, ancestor path defined in app.js

// return the entire blog collection from database
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
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

module.exports = blogRouter;
