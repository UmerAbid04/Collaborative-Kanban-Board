import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(text);
    }, 300);

    return () => clearTimeout(timer);
  }, [text, onSearch]);

  return (
  <input
    className="search-bar"
    type="text"
    placeholder="Search cards..."
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
);
}

export default SearchBar;