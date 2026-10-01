import { useState } from "react";
import { API } from "../data/authors.js";
import { useFetch } from "../hooks/useFetch.js";

function PostList({ authorId }) {
  const { data: posts, loading, error } = useFetch(`${API}/posts?userId=${authorId}`);
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p role="alert">Could not load posts: {error}</p>;

  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <label htmlFor="search">Filter by title</label>
      <input
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {visiblePosts.length === 0 ? (
        <p>No posts match.</p>
      ) : (
        <ul>
          {visiblePosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PostList;
