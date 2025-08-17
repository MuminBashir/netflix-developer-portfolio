import React, { useEffect, useState } from "react";
import "./Blogs.css";
import { FaMedium, FaDev, FaExternalLinkAlt } from "react-icons/fa";
import { Blog } from "../types";
import { getBlogs } from "../queries/getBlogs";

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setBlogs(data);
    }

    fetchBlogs();
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "medium":
        return <FaMedium />;
      case "dev.to":
        return <FaDev />;
      default:
        return <FaExternalLinkAlt />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (blogs.length === 0) return <div className="loading">Loading...</div>;

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1 className="blogs-title">✍️ My Blog Posts</h1>
        <p className="blogs-intro">
          A collection of my thoughts and tutorials on software development
        </p>
      </div>

      <div className="blogs-grid">
        {blogs.map((blog, index) => (
          <a
            href={blog.link}
            key={blog.id}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card"
            style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="blog-header">
              <div className="blog-icon">{getPlatformIcon(blog.platform)}</div>
              <div className="blog-external-link">
                <FaExternalLinkAlt />
              </div>
            </div>

            <div className="blog-info">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>

              <div className="blog-meta">
                <span className="blog-platform">{blog.platform}</span>
                <span className="blog-read-time">{blog.readTime}</span>
                <span className="blog-date">
                  {formatDate(blog.publishedDate)}
                </span>
              </div>

              <div className="blog-tags">
                {blog.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
