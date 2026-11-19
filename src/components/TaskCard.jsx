import { useState } from 'react';
import { COLUMNS } from '../utils/tasks';

export default function TaskCard({ task, onUpdate, onDelete, onMove }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const save = () => {
    if (!title.trim()) return;
    onUpdate(task.id, { title: title.trim(), description: description.trim() });
    setEditing(false);
  };

  if (editing) {
    return (
      <article className="task-card">
        <input aria-label="Editar título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea aria-label="Editar descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="task-actions">
          <button onClick={save}>Guardar</button>
          <button className="secondary" onClick={() => setEditing(false)}>Cancelar</button>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`task-card status-${task.status}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
    >
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="task-actions">
        <select
          aria-label={`Estado de ${task.title}`}
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button className="secondary" onClick={() => setEditing(true)}>Editar</button>
        <button className="danger" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}