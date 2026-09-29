function Card({ title, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {/* children is the time, speaker and seats passed in */}
      <div className="card-body">{children}</div>
    </article>
  );
}
export default Card;
