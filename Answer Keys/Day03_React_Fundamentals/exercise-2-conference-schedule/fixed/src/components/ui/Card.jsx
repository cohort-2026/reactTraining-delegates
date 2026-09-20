function Card({ title, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </article>
  );
}
export default Card;
