import { useState } from "react";
import { useBoard } from "../context/useBoard";

interface AddCardProps {
  columnId: string;
}

function AddCard({ columnId }: AddCardProps) {
  const { optimisticDispatch } = useBoard();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [labels, setLabels] = useState("");

  async function addCard() {
    if (!title.trim()) return;

    await optimisticDispatch({
  type: "ADD_CARD",
  payload: {
    columnId,
    card: {
      id: crypto.randomUUID(),
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

    setTitle("");
    setDescription("");
    setPriority("low");
    setLabels("");
  }

  return (
    <div className="add-card">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        placeholder="Labels (comma separated)"
        value={labels}
        onChange={(e) => setLabels(e.target.value)}
      />

      <button onClick={addCard}>
        Add Card
      </button>
    </div>
  );
}

export default AddCard;