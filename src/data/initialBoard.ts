import type { BoardState } from "../types/board";

export const initialBoard: BoardState = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: "1",
          title: "Design Homepage",
          description: "Create homepage layout",
          priority: "high",
          labels: ["Design"],
        },
        {
          id: "2",
          title: "Write Documentation",
          description: "Complete README",
          priority: "medium",
          labels: ["Docs"],
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      cards: [
        {
          id: "3",
          title: "Build Login Page",
          description: "React + TypeScript",
          priority: "high",
          labels: ["Frontend"],
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [
        {
          id: "4",
          title: "Setup Project",
          description: "Create Vite project",
          priority: "low",
          labels: ["Setup"],
        },
      ],
    },
  ],
};