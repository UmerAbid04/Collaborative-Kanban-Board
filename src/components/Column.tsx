import type { Column as ColumnType } from "../types/board";
import Card from "./Card";

interface ColumnProps {
  column: ColumnType;
}

function Column({ column }: ColumnProps) {
  return (
    <div className="column">
      <h2>{column.title}</h2>

      {column.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Column;