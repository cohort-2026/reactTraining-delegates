import { useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes((l) => l + 1);
  }

  return <button onClick={handleLike}>Like this blog ({likes})</button>;
}

export default LikeButton;
