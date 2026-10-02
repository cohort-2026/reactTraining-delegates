import { useState } from "react";

function LikeButton() {
  // Bug 5: the count is on screen, so it belongs in state, not a ref.
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes((l) => l + 1);
  }

  return <button onClick={handleLike}>Like this blog ({likes})</button>;
}

export default LikeButton;
