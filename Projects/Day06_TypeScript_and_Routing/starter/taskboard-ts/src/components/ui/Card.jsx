// TODO (Lab 6.1 step 4): add a CardProps type (children is a ReactNode).
function Card({ title, variant = "default", children }) {
  return (
    <section className={`card card-${variant}`}>
      {title && <h2>{title}</h2>}
      <div className="card-body">{children}</div>
    </section>
  );
}
export default Card;
