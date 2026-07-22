import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode, Dispatch } from "react";

import type { BoardState } from "../types/board";

import { boardReducer } from "./boardReducer";
import { initialBoard } from "../data/initialBoard";

import type { BoardAction } from "./boardReducer";


interface BoardContextType {
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextType | null>(null);
function loadBoard() {
  const savedBoard = localStorage.getItem("kanban-board");

  if (savedBoard) {
    return JSON.parse(savedBoard);
  }

  return initialBoard;
}

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
  boardReducer,
  undefined,
  loadBoard
);
  useEffect(() => {
  localStorage.setItem(
    "kanban-board",
    JSON.stringify(state)
  );
}, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used within BoardProvider");
  }

  return context;
}