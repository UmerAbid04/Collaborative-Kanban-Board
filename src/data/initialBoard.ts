import type { BoardState } from "../types/board";

export const initialBoard: BoardState = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      cards: [],
    },
    {
      id: "progress",
      title: "In Progress",
      cards: [],
    },
    {
      id: "done",
      title: "Done",
      cards: [],
    },
  ],
};