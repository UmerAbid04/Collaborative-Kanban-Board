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
  }
  | {
    type: "MOVE_CARD";
payload: {
  fromColumnId: string;
  toColumnId: string;
  cardId: string;
  targetCardId: string | null;
};
  }
  | {
    type: "SET_BOARD";
    payload: BoardState;
  };

export function boardReducer(
  state: BoardState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case "SET_BOARD":
  return action.payload;
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
  case "MOVE_CARD": {
  const { fromColumnId, toColumnId, cardId, targetCardId } = action.payload;

  let movedCard: Card | undefined;

  const columns = state.columns.map((column) => {
    if (column.id !== fromColumnId) return column;

    movedCard = column.cards.find((card) => card.id === cardId);

    return {
      ...column,
      cards: column.cards.filter((card) => card.id !== cardId),
    };
  });

  if (!movedCard) {
    return state;
  }

  return {
    ...state,
    columns: columns.map((column) => {
      if (column.id !== toColumnId) return column;

      const cards = [...column.cards];

      if (targetCardId === null) {
        cards.push(movedCard!);
      } else {
        const index = cards.findIndex(
          (card) => card.id === targetCardId
        );

        if (index === -1) {
          cards.push(movedCard!);
        } else {
          cards.splice(index, 0, movedCard!);
        }
      }

      return {
        ...column,
        cards,
      };
    }),
  };
}

    default:
      return state;
  }
}