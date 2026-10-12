
function Card({ children, title }) {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
      <div className="card__content">
        {children}
      </div>
    </div>
  )
}

export default Card
