function Card({ title, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <div className="card-body"></div>
    </article>
  );
}
export default Card;
