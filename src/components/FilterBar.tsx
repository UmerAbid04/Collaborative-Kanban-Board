interface FilterBarProps {
  priority: string;
  label: string;
  labels: string[];
  onPriorityChange: (value: string) => void;
  onLabelChange: (value: string) => void;
}

function FilterBar({
  priority,
  label,
  labels,
  onPriorityChange,
  onLabelChange,
}: FilterBarProps) {
  return (
    <div>
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

     <select
  value={label}
  onChange={(e) => onLabelChange(e.target.value)}
>
  <option value="">All Labels</option>

  {labels.map((label) => (
    <option
      key={label}
      value={label}
    >
      {label}
    </option>
  ))}
</select>
    </div>
  );
}

export default FilterBar;