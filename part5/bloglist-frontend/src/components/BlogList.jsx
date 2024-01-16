import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
export const BlogList = () => {
  // get the blogList state from server
  // use react query
  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // check if loading
  if (blogsQuery.isLoading) {
    return <div>Loading Blogs...</div>;
  }

  if (blogsQuery.isError) {
    console.log("====================================");
    console.log(blogsQuery.error.message);
    console.log("====================================");
    return <div>An error has occurred...</div>;
  }

  const blogList = blogsQuery.data;
  console.log("====================================");
  console.log(blogList);
  console.log("====================================");

  // TODO: to create Link tags for Routing
  return (
    <div>
      <h2>Your Blogs</h2>
      {blogList.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
