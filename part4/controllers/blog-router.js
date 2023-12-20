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
blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
