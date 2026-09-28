/**
 * Card
 * A reusable surface container.
 *
 * Props:
 *   title     — optional heading
 *   footer    — optional footer content
 *   className — extra classes to append
 *   children  — main content
 */
function Card({ title, footer, className = "", children }) {
  return (
    <div className={`card ${className}`.trim()}>
      {title && (
        <h3 className="mb-3 text-lg font-bold text-gray-900">{title}</h3>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;