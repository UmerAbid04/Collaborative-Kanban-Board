import Board from "./components/Board";
import { useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { useBoard } from "./context/BoardContext";
import Toast from "./components/Toast";


function App() {
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [labelFilter, setLabelFilter] = useState("");
  const { state } = useBoard();
  const [toast, setToast] = useState("");
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
<Toast message={toast} />
    </div>
  );
}

export default App;