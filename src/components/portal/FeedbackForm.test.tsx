import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FeedbackForm from './FeedbackForm'

const sections = ['Logo', 'Color Palette', 'Typography']

describe('FeedbackForm', () => {
  it('renders section select with provided options', () => {
    render(<FeedbackForm sections={sections} revisionRound={2} onSubmit={vi.fn()} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.getByText('Color Palette')).toBeInTheDocument()
  })

  it('renders a text input when no sections provided', () => {
    render(<FeedbackForm sections={[]} revisionRound={1} onSubmit={vi.fn()} />)
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Logo, Color Palette/i)).toBeInTheDocument()
  })

  it('disables submit button when body is empty', () => {
    render(<FeedbackForm sections={sections} revisionRound={1} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeDisabled()
  })

  it('enables submit button when body has content', () => {
    render(<FeedbackForm sections={sections} revisionRound={1} onSubmit={vi.fn()} />)
    fireEvent.change(screen.getByPlaceholderText(/Share your thoughts/i), {
      target: { value: 'The logo looks great!' },
    })
    expect(screen.getByRole('button', { name: /submit feedback/i })).not.toBeDisabled()
  })

  it('calls onSubmit with section and body on submit', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<FeedbackForm sections={sections} revisionRound={2} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText(/Share your thoughts/i), {
      target: { value: 'Looks good to me.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('Logo', 'Looks good to me.')
    })
  })

  it('shows success state after successful submission', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<FeedbackForm sections={sections} revisionRound={2} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText(/Share your thoughts/i), {
      target: { value: 'All good.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))

    await waitFor(() => {
      expect(screen.getByText(/Feedback received/i)).toBeInTheDocument()
    })
  })

  it('shows error state when onSubmit rejects', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'))
    render(<FeedbackForm sections={sections} revisionRound={1} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText(/Share your thoughts/i), {
      target: { value: 'Test feedback.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })
})
