export type Priority = "low" | "medium" | "high";

export interface Card {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  labels: string[];
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface BoardState {
  columns: Column[];
}