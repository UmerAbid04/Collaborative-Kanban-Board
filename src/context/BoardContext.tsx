import {
  createContext,
  useContext,
  useReducer,
} from "react";

import type { ReactNode } from "react";
import { boardReducer } from "./boardReducer";
import { initialBoard } from "../data/initialBoard";

const BoardContext = createContext<any>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialBoard);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}