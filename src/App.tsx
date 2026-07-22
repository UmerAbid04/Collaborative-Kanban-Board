import { useMemo, useState } from "react";
import Board from "./components/Board";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { useBoard } from "./context/useBoard";
import { useToast } from "./context/ToastContext";

function App() {
  const { state } = useBoard();
  const { showToast } = useToast();

  const [searchText, setSearchText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState("");

  const labels = useMemo(() => {
    return [
      ...new Set(
        state.columns.flatMap((column) =>
          column.cards.flatMap((card) => card.labels)
        )
      ),
    ];
  }, [state]);

  return (
    <div className="app">
      <h1>Collaborative Kanban Board</h1>

      <SearchBar onSearch={setSearchText} />

      <FilterBar
        priority={priorityFilter}
        label={labelFilter}
        labels={labels}
        onPriorityChange={setPriorityFilter}
        onLabelChange={setLabelFilter}
      />

      <Board
        searchText={searchText}
        priorityFilter={priorityFilter}
        labelFilter={labelFilter}
      />
    </div>
  );
}

export default App;