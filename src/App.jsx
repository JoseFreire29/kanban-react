import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import Column from './components/Column';
import { COLUMNS, createTask, updateTask, deleteTask, moveTask, getTasksByStatus } from './utils/tasks';

const STORAGE_KEY = 'kanban-tasks';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (title, description) => setTasks((prev) => [...prev, createTask(title, description)]);
  const handleUpdate = (id, changes) => setTasks((prev) => updateTask(prev, id, changes));
  const handleDelete = (id) => setTasks((prev) => deleteTask(prev, id));
  const handleMove = (id, status) => setTasks((prev) => moveTask(prev, id, status));

  return (
    <div className="app">
      <h1>Tablero Kanban</h1>
      <TaskForm onAdd={handleAdd} />
      <main className="board">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={getTasksByStatus(tasks, column.id)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ))}
      </main>
    </div>
  );
}