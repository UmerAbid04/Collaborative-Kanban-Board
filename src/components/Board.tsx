import { useBoard } from "../context/BoardContext";
import AddColumn from "./AddColumn";
import Column from "./Column";

interface BoardProps {
  searchText: string;
  priorityFilter: string;
  labelFilter: string;
}

function Board({
  searchText,
  priorityFilter,
  labelFilter,
}: BoardProps) {
  const { state } = useBoard();

  return (
    <>
      <AddColumn />

      <div className="board">
        {state.columns.map((column) => {
          const filteredColumn = {
            ...column,
            cards: column.cards.filter((card) => {
              const search = searchText.toLowerCase();

              const matchesSearch =
                card.title.toLowerCase().includes(search) ||
                card.description.toLowerCase().includes(search);

              const matchesPriority =
                priorityFilter === "" ||
                card.priority === priorityFilter;

              const matchesLabel =
                labelFilter === "" ||
                card.labels.includes(labelFilter);

              return (
                matchesSearch &&
                matchesPriority &&
                matchesLabel
              );
            }),
          };

          return (
            <Column
              key={column.id}
              column={filteredColumn}
            />
          );
        })}
      </div>
    </>
  );
}

export default Board;