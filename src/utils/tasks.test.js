import { describe, it, expect } from 'vitest'
import {
  STATUSES,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  getTasksByStatus,
} from './tasks'

describe('Lógica del tablero Kanban', () => {
  it('crea una tarea nueva en estado Pendiente', () => {
    const task = createTask('Diseñar login', 'Pantalla de inicio')
    expect(task.title).toBe('Diseñar login')
    expect(task.status).toBe(STATUSES.TODO)
  })

  it('no permite crear una tarea sin título', () => {
    expect(() => createTask('   ')).toThrow('El título de la tarea es obligatorio')
  })

  it('edita el título de una tarea', () => {
    const task = createTask('Original')
    const result = updateTask([task], task.id, { title: 'Editada' })
    expect(result[0].title).toBe('Editada')
  })

  it('elimina una tarea', () => {
    const a = createTask('A')
    const b = createTask('B')
    const result = deleteTask([a, b], a.id)
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('B')
  })

  it('cambia el estado de una tarea a En progreso', () => {
    const task = createTask('Mover')
    const result = moveTask([task], task.id, STATUSES.IN_PROGRESS)
    expect(result[0].status).toBe(STATUSES.IN_PROGRESS)
  })

  it('rechaza un estado inválido', () => {
    const task = createTask('X')
    expect(() => moveTask([task], task.id, 'archivado')).toThrow()
  })

  it('filtra las tareas por estado', () => {
    const a = createTask('A')
    const b = { ...createTask('B'), status: STATUSES.DONE }
    expect(getTasksByStatus([a, b], STATUSES.DONE)).toEqual([b])
  })
})