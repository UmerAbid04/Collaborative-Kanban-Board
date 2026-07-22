import type { BoardState, Column, Card } from "../types/board";

export type BoardAction =
  | {
      type: "ADD_COLUMN";
      payload: Column;
    }
  | {
      type: "RENAME_COLUMN";
      payload: {
        id: string;
        title: string;
      };
    }
  | {
      type: "DELETE_COLUMN";
      payload: {
        id: string;
      };
    }
    | {
    type: "ADD_CARD";
    payload: {
      columnId: string;
      card: Card;
    };
  }
  | {
    type: "UPDATE_CARD";
    payload: {
      columnId: string;
      card: Card;
    };
  }
| {
    type: "DELETE_CARD";
    payload: {
      columnId: string;
      cardId: string;
    };
  };

export function boardReducer(
  state: BoardState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case "ADD_COLUMN":
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
      case "RENAME_COLUMN":
  return {
    ...state,
    columns: state.columns.map((column) =>
      column.id === action.payload.id
        ? { ...column, title: action.payload.title }
        : column
    ),
  };
  case "DELETE_COLUMN":
  return {
    ...state,
    columns: state.columns.filter(
      (column) => column.id !== action.payload.id
    ),
  };
  case "ADD_CARD":
  return {
    ...state,
    columns: state.columns.map((column) =>
      column.id === action.payload.columnId
        ? {
            ...column,
            cards: [...column.cards, action.payload.card],
          }
        : column
    ),
  };
  case "UPDATE_CARD":
  return {
    ...state,
    columns: state.columns.map((column) =>
      column.id === action.payload.columnId
        ? {
            ...column,
            cards: column.cards.map((card) =>
              card.id === action.payload.card.id
                ? action.payload.card
                : card
            ),
          }
        : column
    ),
  };
  case "DELETE_CARD":
  return {
    ...state,
    columns: state.columns.map((column) =>
      column.id === action.payload.columnId
        ? {
            ...column,
            cards: column.cards.filter(
              (card) => card.id !== action.payload.cardId
            ),
          }
        : column
    ),
  };

    default:
      return state;
  }
}