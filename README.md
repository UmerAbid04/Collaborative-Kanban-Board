# Collaborative Kanban Board

A modern Kanban board application built with React and TypeScript. The application allows users to manage tasks across multiple columns with card creation, editing, deletion, drag-and-drop movement, search, filtering, persistence, and optimistic UI updates.

## Live Demo

(Add Vercel deployment link here)

---

## Features

### Board Management

- Create new columns
- Rename columns
- Delete columns
- Organize tasks using a Kanban workflow

### Card Management

Each card supports:

- Title
- Description
- Priority
- Labels

Available actions:

- Add cards
- Edit cards
- Delete cards
- Move cards between columns using drag and drop

---

## Search and Filtering

The application provides:

- Search cards by title
- Search cards by description
- Filter by priority
- Filter by labels
- Combine search and filters together

---

## Optimistic Updates

The application implements optimistic UI updates to provide a faster user experience.

Instead of waiting for the API response before updating the interface:

---

# State Management

Global application state is managed using React Context API with useReducer.

The reducer handles all board operations:

- ADD_COLUMN
- RENAME_COLUMN
- DELETE_COLUMN
- ADD_CARD
- UPDATE_CARD
- DELETE_CARD
- MOVE_CARD

Using a reducer keeps state transitions predictable and makes complex updates easier to manage.

---

# Persistence

The application uses LocalStorage to persist board data.

When the application loads:

1. Saved board data is retrieved from LocalStorage.
2. If no saved data exists, initial sample data is loaded.

Whenever the board changes:

1. The updated state is automatically saved.

---

# Mock API

The application includes a mock API layer that simulates real backend behavior.

Features:

- Artificial network delay
- Random request failures
- Success and failure handling

This allows optimistic updates and rollback behavior to be tested without a backend.

---

# Author
Muhammad Umer Abid


