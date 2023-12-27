const Lodash = require("lodash");

const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => (sum += item.likes), 0);
};

const mostLikes = (blogs) => {
  // let mostLikedBlog = { likes: -1 };
  // console.log(blogs);
  // for (const blog of blogs) {
  //   if (blog.likes > mostLikedBlog.likes) {
  //     mostLikedBlog = blog;
  //   }
  // }
  let mostLikedBlog = Lodash.maxBy(blogs, "likes");
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  let mostBlogsObj = Lodash.maxBy(blogs, "blogs");
  return {author:mostBlogsObj.author, blogs:mostBlogsObj.blogs}
};
module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs
};
