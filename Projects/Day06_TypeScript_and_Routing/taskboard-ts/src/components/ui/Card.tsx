import type { ReactNode } from "react";

type CardPadding = "sm" | "md" | "lg";

type CardProps = {
  title?: string;
  footer?: ReactNode;
  padding?: CardPadding;
  className?: string;
  children: ReactNode;
};

function Card({
  title,
  footer,
  padding = "md",
  className = "",
  children,
}: CardProps) {
  const paddings: Record<CardPadding, string> = {
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${paddings[padding]} ${className}`}
    >
      {title && <h3 className="mb-3 text-lg font-bold text-gray-900">{title}</h3>}
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