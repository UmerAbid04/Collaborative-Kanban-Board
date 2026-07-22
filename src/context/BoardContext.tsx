import { createContext, useReducer, useEffect } from "react";
import type { ReactNode, Dispatch } from "react";

import type { BoardState } from "../types/board";
import type { BoardAction } from "./boardReducer";

import { boardReducer } from "./boardReducer";
import { initialBoard } from "../data/initialBoard";

import { fakeRequest } from "../api/mockApi";
import { useToast } from "./ToastContext";


interface BoardContextType {
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
  optimisticDispatch: (
    action: BoardAction
  ) => Promise<void>;
}


export const BoardContext =
  createContext<BoardContextType | null>(null);


function loadBoard(): BoardState {
  const savedBoard = localStorage.getItem(
    "kanban-board"
  );

  if (savedBoard) {
    return JSON.parse(savedBoard);
  }

  return initialBoard;
}


export function BoardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    boardReducer,
    undefined,
    loadBoard
  );

  const { showToast } = useToast();


  useEffect(() => {
    localStorage.setItem(
      "kanban-board",
      JSON.stringify(state)
    );
  }, [state]);


  async function optimisticDispatch(
    action: BoardAction
  ) {
    const previousState = structuredClone(state);


    // Update UI immediately
    dispatch(action);


    try {
      await fakeRequest();

    } catch {

      // Restore old state
      dispatch({
        type: "SET_BOARD",
        payload: previousState,
      });


      showToast(
        "Request failed. Changes reverted."
      );
    }
  }


  return (
    <BoardContext.Provider
      value={{
        state,
        dispatch,
        optimisticDispatch,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}