// src/store/taskListSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListState {
  tasks: Task[];
}

// Load from localStorage or default to empty
const loadFromLocalStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch {}
};

const initialState: TaskListState = {
  tasks: loadFromLocalStorage(),
};

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
      };
      state.tasks.push(newTask);
      saveToLocalStorage(state.tasks);
    },
    toggleTaskCompleted: (state, action: PayloadAction<{ id: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state.tasks);
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        saveToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
      saveToLocalStorage(state.tasks);
    },
  },
});

export const { addTask, toggleTaskCompleted, editTask, deleteTask } = taskListSlice.actions;

export default taskListSlice.reducer;
