import { useState } from 'react'

interface FeedbackFormProps {
  sections: string[]
  revisionRound: number
  onSubmit: (section: string, body: string) => Promise<void>
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function FeedbackForm({ sections, revisionRound, onSubmit }: FeedbackFormProps) {
  const [section, setSection] = useState(sections[0] ?? '')
  const [body, setBody] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!section || !body.trim() || formState === 'submitting') return

    setFormState('submitting')
    try {
      await onSubmit(section, body.trim())
      setFormState('success')
      setBody('')
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="bg-white border border-stone/40 rounded-lg p-6">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2D6B2D] block mb-2">
          Feedback received
        </span>
        <p className="font-sans text-sm text-dark leading-relaxed">
          Your feedback has been submitted for Round {revisionRound}. We'll be in touch.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-forest transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral rounded-sm"
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-stone/40 rounded-lg p-6">
      <div className="mb-5">
        <label
          htmlFor="feedback-section"
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-2"
        >
          Section
        </label>
        {sections.length > 0 ? (
          <select
            id="feedback-section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border border-stone/40 rounded-md px-4 py-3 font-sans text-sm text-dark bg-white focus-visible:outline-none focus-visible:shadow-coral transition-shadow duration-150 appearance-none"
          >
            {sections.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <input
            id="feedback-section"
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. Logo, Color Palette, Typography"
            className="w-full border border-stone/40 rounded-md px-4 py-3 font-sans text-sm text-dark bg-white placeholder:text-stone/60 focus-visible:outline-none focus-visible:shadow-coral transition-shadow duration-150"
          />
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="feedback-body"
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-2"
        >
          Feedback
        </label>
        <textarea
          id="feedback-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts on this section…"
          rows={5}
          required
          className="w-full border border-stone/40 rounded-md px-4 py-3 font-sans text-sm text-dark bg-white placeholder:text-stone/60 focus-visible:outline-none focus-visible:shadow-coral transition-shadow duration-150 resize-y"
        />
      </div>

      {formState === 'error' && (
        <p className="font-sans text-sm text-[#C0392B] mb-4">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={!section || !body.trim() || formState === 'submitting'}
        className="bg-coral text-cream font-sans text-sm font-medium rounded-md px-6 py-3 hover:bg-coral-light transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-coral"
      >
        {formState === 'submitting' ? 'Submitting…' : 'Submit feedback'}
      </button>
    </form>
  )
}
