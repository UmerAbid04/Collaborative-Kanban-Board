import { useState } from "react";
import type { Column as ColumnType } from "../types/board";
import { useBoard } from "../context/useBoard";
import Card from "./Card";
import AddCard from "./AddCard";

interface ColumnProps {
  column: ColumnType;
}

function Column({ column }: ColumnProps) {
  const { dispatch, optimisticDispatch } = useBoard();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);


  function saveTitle() {
    const newTitle = title.trim();

    if (!newTitle) return;

    dispatch({
      type: "RENAME_COLUMN",
      payload: {
        id: column.id,
        title: newTitle,
      },
    });

    setIsEditing(false);
  }


  function deleteColumn() {
    const confirmed = window.confirm(
      "Delete this column?"
    );

    if (!confirmed) return;

    dispatch({
      type: "DELETE_COLUMN",
      payload: {
        id: column.id,
      },
    });
  }


  async function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    const cardId =
      event.dataTransfer.getData("cardId");

    const fromColumnId =
      event.dataTransfer.getData("columnId");


    if (!cardId || !fromColumnId) return;

    if (fromColumnId === column.id) return;


    await optimisticDispatch({
      type: "MOVE_CARD",
      payload: {
        fromColumnId,
        toColumnId: column.id,
        cardId,
        targetCardId: null,
      },
    });
  }


  function handleDragOver(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
  }


  return (
    <div
      className="column"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >

      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button onClick={saveTitle}>
            Save
          </button>
        </>
      ) : (
        <div className="column-header">

          <h2>{column.title}</h2>

          <div>
            <button
              onClick={() =>
                setIsEditing(true)
              }
            >
              Edit
            </button>

            <button onClick={deleteColumn}>
              Delete
            </button>
          </div>

        </div>
      )}


      <AddCard columnId={column.id} />


      {column.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          columnId={column.id}
        />
      ))}

    </div>
  );
}

export default Column;