import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Modo oscuro', () => {
  it('alterna entre tema claro y oscuro', async () => {
    const user = userEvent.setup()
    render(<App />)
    const boton = screen.getByRole('button', { name: 'Cambiar tema' })

    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(boton)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(boton).toHaveTextContent('Modo claro')

    await user.click(boton)
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})