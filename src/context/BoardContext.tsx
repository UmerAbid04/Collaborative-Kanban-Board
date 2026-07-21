import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";

import type { BoardState } from "../types/board";

import { boardReducer } from "./boardReducer";
import { initialBoard } from "../data/initialBoard";

type BoardAction = {
  type: string;
  payload?: unknown;
};

interface BoardContextType {
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialBoard);

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