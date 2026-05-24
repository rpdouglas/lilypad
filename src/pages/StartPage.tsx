// Persona: Sarah (primary — zero-friction booking, fast mobile action)
// Persona: Marcus (secondary — wants to understand the process before committing)
// Route: /start

import { motion } from 'framer-motion'

const TRUST_SIGNALS = [
  'Free 30-minute call — no obligation',
  "We'll tell you honestly if we're a fit",
  'Response within one business day',
]

export default function StartPage() {
  return (
    <>
      {/* Page header — minimal, no distraction */}
      <section className="bg-forest text-cream pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-6">
              Start a Project
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-light leading-tight text-cream mb-4 max-w-lg">
              Let's talk about your{' '}
              <em className="italic text-coral">brand</em>.
            </h1>
            <p className="font-sans text-base text-stone leading-relaxed max-w-md">
              Pick a time that works for you. We'll spend 30 minutes learning
              about your business — and you'll leave with a clear sense of
              what to do next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-dark border-b border-stone/20">
        <div className="max-w-content mx-auto px-6 lg:px-10 py-4">
          <ul className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            {TRUST_SIGNALS.map((signal, i) => (
              <li
                key={i}
                className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-stone uppercase"
              >
                <span className="text-coral">✓</span>
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Booking embed */}
      <section className="bg-cream py-12 lg:py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          >
            {/* Cal.com embed
                Replace "lily-pad/discovery" with the actual Cal.com username/event
                when the account is configured. */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden min-h-[600px] lg:min-h-[700px]">
              <iframe
                src="https://cal.com/lily-pad/discovery"
                width="100%"
                height="700"
                title="Book a discovery call with Lily Pad"
                className="border-0"
              />
            </div>

            {/* Fallback contact note */}
            <p className="font-sans text-sm text-stone text-center mt-6 leading-relaxed">
              Having trouble with the booking form?{' '}
              <a
                href="mailto:hello@lilypad.design"
                className="text-forest underline underline-offset-4 hover:text-coral transition-colors duration-150"
              >
                Email us directly
              </a>{' '}
              and we'll get back to you within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-cream-alt py-12 lg:py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-normal text-forest leading-tight mb-8">
              What happens on the call.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'You talk, we listen',
                  body: 'Tell us about your business, where you are, and where you want to go. No prep needed.',
                },
                {
                  step: '02',
                  title: 'We share what we see',
                  body: "Based on what you share, we'll tell you honestly what's likely blocking you and what we'd prioritise.",
                },
                {
                  step: '03',
                  title: 'We both decide',
                  body: "If there's a fit, we'll outline a next step. If not, we'll point you somewhere better. No pressure either way.",
                },
              ].map(item => (
                <div key={item.step}>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-coral block mb-3">
                    {item.step}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-stone leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
