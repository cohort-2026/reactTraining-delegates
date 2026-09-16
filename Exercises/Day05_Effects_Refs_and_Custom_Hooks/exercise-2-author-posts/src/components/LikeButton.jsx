import { useRef } from "react";

function LikeButton() {
  const likes = useRef(0);

  function handleLike() {
    likes.current += 1;
  }

  return <button onClick={handleLike}>Like this blog ({likes.current})</button>;
}

export default LikeButton;
