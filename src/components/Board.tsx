import { useBoard } from "../context/BoardContext";
import AddColumn from "./AddColumn";
import Column from "./Column";

function Board() {
  const { state } = useBoard();

  return (
    <>
      <AddColumn />

      <div className="board">
        {state.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </>
  );
}

export default Board;