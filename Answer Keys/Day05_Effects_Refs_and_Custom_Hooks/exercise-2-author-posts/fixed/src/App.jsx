import LikeButton from "./components/LikeButton.jsx";
import PostList from "./components/PostList.jsx";
import { authors } from "./data/authors.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

function App() {
  const [authorId, setAuthorId] = useLocalStorage("authorId", authors[0].id);

  return (
    <main>
      <h1>Author Posts</h1>

      <label htmlFor="author">Author</label>
      <select
        id="author"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
      >
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <LikeButton />
      <PostList authorId={authorId} />
    </main>
  );
}

export default App;
