import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Kanban (interfaz)', () => {
  it('muestra las tres columnas', () => {
    render(<App />)
    expect(screen.getByRole('region', { name: 'Pendiente' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'En progreso' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Completado' })).toBeInTheDocument()
  })

  it('crea una tarea y aparece en Pendiente', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Título'), 'Configurar CI')
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }))
    const pendiente = screen.getByRole('region', { name: 'Pendiente' })
    expect(within(pendiente).getByText('Configurar CI')).toBeInTheDocument()
  })

  it('mueve una tarea a Completado y luego la elimina', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Título'), 'Deploy')
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }))

    await user.selectOptions(screen.getByLabelText('Estado de Deploy'), 'done')
    const completado = screen.getByRole('region', { name: 'Completado' })
    expect(within(completado).getByText('Deploy')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(screen.queryByText('Deploy')).not.toBeInTheDocument()
  })
})