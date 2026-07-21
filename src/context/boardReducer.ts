import type { BoardState } from "../types/board";

export function boardReducer(
  state: BoardState,
  action: any
): BoardState {
  switch (action.type) {
    default:
      return state;
  }
}