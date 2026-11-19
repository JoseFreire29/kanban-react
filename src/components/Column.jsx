import TaskCard from './TaskCard';

export default function Column({ column, tasks, onUpdate, onDelete, onMove }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) onMove(id, column.id);
  };

  return (
    <section
      className="column"
      aria-label={column.title}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <h2>{column.title}</h2>
        <span className="badge">{tasks.length}</span>
      </header>
      {tasks.length === 0 && <p className="empty">Sin tareas</p>}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onMove={onMove} />
      ))}
    </section>
  );
}