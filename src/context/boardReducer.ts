import type { BoardState } from "../types/board";

export function boardReducer(
  state: BoardState,
  action: { type: string; payload?: unknown }
): BoardState {
  switch (action.type) {
    default:
      return state;
  }
}