import type { Card as CardType } from "../types/board";

interface CardProps {
  card: CardType;
}

function Card({ card }: CardProps) {
  return (
    <div className="card">
      <h3>{card.title}</h3>

      <p>{card.description}</p>

      <p>
        <strong>Priority:</strong> {card.priority}
      </p>

      {card.labels.length > 0 && (
        <div className="labels">
          {card.labels.map((label) => (
            <span key={label} className="label">
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;