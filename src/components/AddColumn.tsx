import { useState } from "react";
import { useBoard } from "../context/useBoard";

function AddColumn() {
  const { dispatch } = useBoard();
  const [columnTitle, setColumnTitle] = useState("");

  function addColumn() {
    const title = columnTitle.trim();

    if (!title) return;

    dispatch({
      type: "ADD_COLUMN",
      payload: {
        id: crypto.randomUUID(),
        title,
        cards: [],
      },
    });

    setColumnTitle("");
  }

  return (
    <div className="add-column">
      <input
        type="text"
        placeholder="Enter column name"
        value={columnTitle}
        onChange={(e) => setColumnTitle(e.target.value)}
      />

      <button onClick={addColumn}>Add Column</button>
    </div>
  );
}

export default AddColumn;