const listHelper = require("../utils/list_helper");

describe("dummies", () => {
  test("dummy returns 1", () => {
    expect(listHelper.dummy([])).toBe(1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("most likes", () => {
  const bloglist = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "burp",
      author: "dog",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "123",
      author: "cat",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 7,
      __v: 0,
    },
  ];

  test("most liked blog in list", () => {
    const result = listHelper.mostLikes(bloglist);
    expect(result).toEqual({ title: "123", author: "cat", likes: 7 });
  });
});

describe("most blogs", () => {
  const bloglist = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      blogs: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "burp",
      author: "dog",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 6,
      blogs: 1,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "123",
      author: "cat",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 7,
      blogs: 2,
      __v: 0,
    },
  ];

  test("most blogs in list", () => {
    const result = listHelper.mostBlogs(bloglist);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 2 });
  });
});
