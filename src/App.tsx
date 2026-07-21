import { useBoard } from "./context/BoardContext";

function App() {
  const { state } = useBoard();

  return (
    <div>
      <h1>Kanban Board</h1>

      {state.columns.map((column: any) => (
        <div key={column.id}>
          <h2>{column.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;