// Persona: Marcus (primary — process-oriented, needs story and credibility)
// Persona: Sarah (secondary — social proof, founder alignment)
// Route: /about

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
}

const VALUES = [
  {
    title: 'Strategy first, always.',
    body: "We don't open Figma until we understand the business. Every visual decision traces back to a strategic one.",
  },
  {
    title: 'Honest over polished.',
    body: "If we think you're solving the wrong problem, we'll say so. That's not being difficult — it's doing our job.",
  },
  {
    title: 'Founders deserve great work.',
    body: "Enterprise polish shouldn't be gated behind enterprise budgets. We build it right the first time, regardless of your stage.",
  },
  {
    title: 'Momentum matters.',
    body: 'We work in focused sprints because we know that shipping fast and iterating is better than perfecting in private.',
  },
]

const HOW_WE_WORK = [
  {
    step: '01',
    title: 'Discovery Call',
    body: "Free, 30 minutes. We learn about your business, your goals, and what's not working. You learn if we're a fit.",
  },
  {
    step: '02',
    title: 'Scoped Proposal',
    body: 'We write a clear proposal: scope, deliverables, timeline, and investment. No surprises.',
  },
  {
    step: '03',
    title: 'Kickoff & Workshop',
    body: 'Every project starts with a structured workshop. We align on strategy before we touch a tool.',
  },
  {
    step: '04',
    title: 'Build & Review',
    body: 'We work in focused sprints with regular check-ins. You see progress, not just the final product.',
  },
  {
    step: '05',
    title: 'Launch & Handoff',
    body: 'We ship with you, not to you. Full documentation, handoff session, and 30-day post-launch support included.',
  },
]

export default function AboutPage() {
  return (
    <>
      <title>About | Lily Pad Strategy & Design</title>
      <meta name="description" content="We build it right the first time, regardless of your stage. Learn about Lily Pad's founder story, core values, and our exact step-by-step launch methodology." />

      {/* Page Hero */}
      <section className="bg-forest text-cream pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-6">
              About Lily Pad
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight text-cream mb-6 max-w-xl">
              Built for founders who are{' '}
              <em className="italic text-coral">done playing small</em>.
            </h1>
            <p className="font-sans text-base text-stone leading-relaxed max-w-md">
              Lily Pad Strategy & Design is a boutique studio helping ambitious
              founders build brands that earn trust, drive decisions, and scale
              with them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
              className="aspect-[4/5] bg-cream-alt rounded-lg flex items-center justify-center"
            >
              <span className="font-mono text-[11px] tracking-[0.15em] text-stone uppercase">
                Founder photo
              </span>
            </motion.div>

            <motion.div {...fadeUp}>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
                The story
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight mb-6">
                We started because good strategy was{' '}
                <em className="italic text-coral">inaccessible</em>.
              </h2>
              <div className="space-y-4 font-sans text-base text-dark leading-relaxed">
                <p>
                  Lily Pad was founded on a single observation: the founders
                  building the most interesting things had the worst brands.
                  Not because they didn't care — but because the agencies who
                  do great strategic work were out of reach, and everyone else
                  was selling aesthetics without substance.
                </p>
                <p>
                  We set out to close that gap. Strategy-first, founder-friendly,
                  and built to move at startup speed.
                </p>
                <p>
                  Today we work with early-stage founders across B2B SaaS,
                  professional services, and consumer products — helping them
                  build brands that are ready for the next stage before they get
                  there.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
              What we believe
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight">
              The values we work by.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-sans text-sm font-semibold text-dark mb-2">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-stone leading-relaxed">{value.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-forest text-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-4">
              The process
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-cream leading-tight">
              How we <em className="italic text-coral">actually</em> work.
            </h2>
          </motion.div>

          <div className="space-y-8">
            {HOW_WE_WORK.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                className="flex gap-6 border-b border-stone/20 pb-8"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-coral shrink-0 pt-0.5">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-cream mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-stone leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press / Partnerships placeholder */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="text-center">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-4">
              Press & partnerships
            </span>
            <p className="font-display text-2xl font-light text-stone italic">
              Coverage and partnerships — coming in Phase 5.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight mb-4">
              Let's build something{' '}
              <em className="italic text-coral">together</em>.
            </h2>
            <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
              Start with a free 30-minute discovery call. No commitment, no pitch
              deck — just a real conversation about your brand.
            </p>
            <Link
              to="/start"
              className="inline-block font-sans text-sm font-medium bg-coral text-cream px-8 py-4 rounded-md hover:bg-coral-light transition-colors duration-150"
            >
              Book a discovery call
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
