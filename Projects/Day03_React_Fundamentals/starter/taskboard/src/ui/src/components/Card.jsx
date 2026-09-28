function Card({
  title,
  variant = "default",
  children,
}) {
  return (
    <div className={`card card-${variant}`}>
      {title && <h2>{title}</h2>}

      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;