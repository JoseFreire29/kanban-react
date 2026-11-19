import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    onAdd(title, description);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Título de la tarea"
        aria-label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Descripción (opcional)"
        aria-label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Agregar tarea</button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}