import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import type { Card as CardType } from "../types/board";


interface CardProps {
  card: CardType;
  columnId: string;
}

function Card({ card, columnId }: CardProps) {
  const { dispatch } = useBoard();

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [priority, setPriority] = useState(card.priority);
  const [labels, setLabels] = useState(card.labels.join(", "));

  function saveCard() {
    dispatch({
      type: "UPDATE_CARD",
      payload: {
        columnId,
        card: {
          ...card,
          title,
          description,
          priority,
          labels: labels
            .split(",")
            .map((label) => label.trim())
            .filter(Boolean),
        },
      },
    });

    setIsEditing(false);
  }
  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
  event.dataTransfer.setData("cardId", card.id);
  event.dataTransfer.setData("columnId", columnId);
}

function handleDrop(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();

  const cardId = event.dataTransfer.getData("cardId");
  const fromColumnId = event.dataTransfer.getData("columnId");

  dispatch({
    type: "MOVE_CARD",
    payload: {
      fromColumnId,
      toColumnId: columnId,
      cardId,
      targetCardId: card.id,
    },
  });
}

function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
}
  function deleteCard() {
    if (!window.confirm("Delete this card?")) return;

    dispatch({
      type: "DELETE_CARD",
      payload: {
        columnId,
        cardId: card.id,
      },
    });
  }

 return (
  <div
  className="card"
  draggable
  onDragStart={handleDragStart}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
>
    {isEditing ? (
      <>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          placeholder="Labels"
        />

        <button onClick={saveCard}>Save</button>

        <button onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </>
    ) : (
      <>
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

        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button onClick={deleteCard}>
          Delete
        </button>
      </>
    )}
  </div>
);
}

export default Card;