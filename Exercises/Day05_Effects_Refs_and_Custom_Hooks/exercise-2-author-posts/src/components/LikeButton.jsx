import { useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes((l) => l + 1)}>
      Like this blog ({likes})
    </button>
  );
}

export default LikeButton;