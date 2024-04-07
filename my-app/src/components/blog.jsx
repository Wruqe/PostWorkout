function Blog({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-container">
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Blog;
