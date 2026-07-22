import { useBoard } from "../context/BoardContext";
import { fakeRequest } from "../api/mockApi";
import type { BoardAction } from "../context/boardReducer";

export function useOptimisticDispatch() {
  const { state, dispatch } = useBoard();

  async function optimisticDispatch(action: BoardAction) {
    const previousState = state;

    dispatch(action);

    try {
      await fakeRequest();
    } catch {
      dispatch({
        type: "SET_BOARD",
        payload: previousState,
      });

      alert("Request failed. Changes were reverted.");
    }
  }

  return optimisticDispatch;
}