import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import {
  addTask,
  toggleTaskCompleted,
  editTask,
  deleteTask,
  type Task,
} from "../../store/taskListSlice";

const TaskListWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskList.tasks);

  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = () => {
    const trimmed = newTaskText.trim();
    if (trimmed) {
      dispatch(addTask({ text: trimmed }));
      setNewTaskText("");
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (id: string) => {
    const trimmed = editingText.trim();
    if (trimmed) {
      dispatch(editTask({ id, text: trimmed }));
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div className="dark:bg-gray-900 bg-white rounded border border-gray-300 shadow p-4 max-w-md">
      <h2 className="font-bold text-lg mb-4">Task List</h2>

      {/* Add new task */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="New task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="dark:bg-gray-900 dark:text-gray-300 bg-white text-black flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      {tasks.length === 0 && <p className="text-gray-500">No tasks yet.</p>}

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="dark:bg-gray-900 dark:text-white flex items-center justify-between mb-2 p-2 rounded border dark:border-gray-200"
          >
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  dispatch(toggleTaskCompleted({ id: task.id }))
                }
                className="dark:bg-gray-900 bg-gray-100 cursor-pointer h-6 w-6"
              />
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(task.id);
                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditingText("");
                    }
                  }}
                  onBlur={() => saveEdit(task.id)}
                  className="flex-1 border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span
                  className={`dark:text-white text-black flex-1 cursor-pointer select-none ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                  onDoubleClick={() => startEditing(task)}
                >
                  {task.text}
                </span>
              )}
            </div>

            <button
              onClick={() => dispatch(deleteTask({ id: task.id }))}
              className="dark:bg-gray-900 bg-gray-100 border border-gray-300 text-red-600 hover:text-red-800 ml-4"
              aria-label={`Delete task: ${task.text}`}
            >
              &#10005;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListWidget;
