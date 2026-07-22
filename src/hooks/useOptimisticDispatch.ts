import { useBoard } from "../context/useBoard";
import { fakeRequest } from "../api/mockApi";
import type { BoardAction } from "../context/boardReducer";
import type { BoardState } from "../types/board";

export function useOptimisticAction(
  setToast: (message: string) => void
) {
  const { state, dispatch } = useBoard();

  async function execute(action: BoardAction) {
    const previousState: BoardState = structuredClone(state);

    dispatch(action);

    try {
      await fakeRequest();
    } catch {
      dispatch({
        type: "SET_BOARD",
        payload: previousState,
      });

      setToast("Request failed. Changes reverted.");
    }
  }

  return execute;
}