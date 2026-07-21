import type { Card as CardType } from "../types/board";

interface CardProps {
  card: CardType;
}

function Card({ card }: CardProps) {
  return (
    <div className="card">
      <h3>{card.title}</h3>

      <p>{card.description}</p>

      <p>Priority: {card.priority}</p>

      <div>
        {card.labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export default Card;