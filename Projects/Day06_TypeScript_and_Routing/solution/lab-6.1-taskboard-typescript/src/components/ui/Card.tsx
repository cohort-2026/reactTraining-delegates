import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  variant?: "default" | "highlight";
  children: ReactNode;
};

function Card({ title, variant = "default", children }: CardProps) {
  return (
    <section className={`card card-${variant}`}>
      {title && <h2>{title}</h2>}
      <div className="card-body">{children}</div>
    </section>
  );
}
export default Card;
