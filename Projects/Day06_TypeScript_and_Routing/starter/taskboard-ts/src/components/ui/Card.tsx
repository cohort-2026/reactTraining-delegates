import type { ReactNode } from "react";

type CardProps = {
  title: string;
  variant?: "default" | "success" | "warning";
  children: ReactNode;
};

function Card({ title, variant = "default", children }: CardProps) {
  return (
    <section className={`card card-${variant}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default Card;
