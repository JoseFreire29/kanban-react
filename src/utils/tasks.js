export const STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const COLUMNS = [
  { id: STATUSES.TODO, title: 'Pendiente' },
  { id: STATUSES.IN_PROGRESS, title: 'En progreso' },
  { id: STATUSES.DONE, title: 'Completado' },
];

export function createTask(title, description = '') {
  const clean = String(title ?? '').trim();
  if (!clean) throw new Error('El título de la tarea es obligatorio');
  return {
    id: crypto.randomUUID(),
    title: clean,
    description: String(description ?? '').trim(),
    status: STATUSES.TODO,
  };
}

export function updateTask(tasks, id, changes) {
  return tasks.map((t) => (t.id === id ? { ...t, ...changes } : t));
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export function moveTask(tasks, id, newStatus) {
  if (!Object.values(STATUSES).includes(newStatus)) {
    throw new Error(`Estado inválido: ${newStatus}`);
  }
  return tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
}

export function getTasksByStatus(tasks, status) {
  return tasks.filter((t) => t.status === status);
}