// Persona: Sarah (primary — mobile-first, fast decisions, social proof above fold)
// Persona: Marcus (secondary — desktop, needs process depth)
// Route: /

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
}

const SERVICES = [
  {
    label: 'Brand Strategy',
    outcome: 'Clarify who you are before you spend a dollar on design.',
    detail:
      'Positioning workshops, competitive audits, messaging architecture — built to turn confusion into conviction.',
  },
  {
    label: 'Web Development',
    outcome: "A site that doesn't just look good — it works for you.",
    detail:
      'Fast, accessible, conversion-focused builds. From landing pages to full marketing sites.',
  },
  {
    label: 'Design Systems',
    outcome: 'Build your visual identity once. Scale it everywhere.',
    detail:
      'Component libraries, brand guidelines, and design tokens that keep every touchpoint consistent.',
  },
  {
    label: 'Launch Packages',
    outcome: 'Everything you need to enter the market with confidence.',
    detail:
      'Strategy, identity, and site delivered together in a single focused sprint.',
  },
]

const PROCESS_STEPS = [
  { number: '01', title: 'Discover', body: 'Audit your market, your competitors, and your goals.' },
  { number: '02', title: 'Position', body: 'Define your unique value before we touch a single pixel.' },
  { number: '03', title: 'Design', body: 'Visual identity that earns trust on first impression.' },
  { number: '04', title: 'Build', body: 'Fast, clean, and built to scale.' },
  { number: '05', title: 'Launch', body: 'Enter the market with momentum, not apologies.' },
]

const TESTIMONIALS = [
  {
    quote:
      "Lily Pad didn't just build us a site — they gave us a brand we're proud to pitch. Closed our seed round two weeks after launch.",
    name: 'Alex R.',
    role: 'Founder, B2B SaaS',
  },
  {
    quote:
      'We went from "we don\'t know how to explain what we do" to a homepage that actually converts. The strategy work alone was worth it.',
    name: 'Jordan M.',
    role: 'Co-Founder, Professional Services',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero — above the fold on 375px */}
      <section className="bg-forest text-cream pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-6">
              Strategy & Design Studio
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight text-cream mb-6 max-w-2xl">
              We help founders build brands worth{' '}
              <em className="italic text-coral">believing in</em>.
            </h1>
            <p className="font-sans text-base text-stone leading-relaxed max-w-md mb-8">
              From positioning strategy to a site that converts — Lily Pad gives
              founders the brand toolkit they need to launch with intention and
              grow with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/start"
                className="font-sans text-sm font-medium bg-coral text-cream px-6 py-3 rounded-md text-center hover:bg-coral-light transition-colors duration-150"
              >
                Start a Project
              </Link>
              <Link
                to="/services"
                className="font-sans text-sm font-medium text-stone border border-stone/40 px-6 py-3 rounded-md text-center hover:text-cream hover:border-cream transition-colors duration-150"
              >
                See our services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="bg-dark text-cream">
        <div className="max-w-content mx-auto px-6 lg:px-10 py-5">
          <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            {['14 brands launched', '$2M+ in tracked client revenue', '100% founder-led'].map(
              (stat, i) => (
                <li
                  key={i}
                  className="font-mono text-[11px] tracking-[0.15em] text-stone uppercase"
                >
                  {stat}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* Problem Framing */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
              Sound familiar?
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight mb-6">
              You've built something <em className="italic text-coral">real</em>.
            </h2>
            <p className="font-sans text-base text-dark leading-relaxed mb-4">
              But when you try to explain it, the words come out wrong. Your site
              looks like everyone else's. Your visual identity doesn't reflect the
              quality of what you actually deliver.
            </p>
            <p className="font-sans text-base text-dark leading-relaxed">
              You're not the problem — you just haven't had the right partner yet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
              What we do
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight">
              Four ways we help founders{' '}
              <em className="italic text-coral">move faster</em>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-sans text-sm font-semibold text-dark mb-2">
                  {service.label}
                </h3>
                <p className="font-sans text-base text-coral font-normal mb-3 leading-snug">
                  {service.outcome}
                </p>
                <p className="font-sans text-sm text-stone leading-relaxed">
                  {service.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/services"
              className="font-sans text-sm font-medium text-forest hover:text-coral transition-colors duration-150 underline underline-offset-4"
            >
              See all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Case Study Teaser */}
      <section className="bg-forest text-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-4">
              Client story
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-cream leading-tight mb-10">
              From 70% bounce rate to{' '}
              <em className="italic text-coral">closed seed round</em>.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {[
                {
                  label: 'The problem',
                  body: "Couldn't explain their value in a single sentence. Homepage had a 70% bounce rate. Investors weren't responding.",
                },
                {
                  label: 'Our approach',
                  body: '10-day brand sprint. Positioning workshop. Full visual identity. New site in 3 weeks, built on strategy.',
                },
                {
                  label: 'The result',
                  body: 'Lead gen up 40%. Investor pitch closed in 2 weeks. Now expanding to a second market.',
                },
              ].map(({ label, body }) => (
                <div key={label}>
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone block mb-2">
                    {label}
                  </span>
                  <p className="font-sans text-sm text-cream leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 border-coral pl-5">
              <p className="font-display text-xl font-light text-cream italic leading-snug mb-3">
                "Lily Pad didn't just build us a site — they gave us a brand we're
                proud to pitch."
              </p>
              <cite className="font-mono text-[11px] tracking-[0.15em] text-stone uppercase not-italic">
                — Alex R., Founder
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
              The Lily Pad Launch Method
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight">
              Five steps to a brand that{' '}
              <em className="italic text-coral">does the work</em>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-coral block mb-3">
                  {step.number}
                </span>
                <h3 className="font-sans text-sm font-semibold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-stone leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
              What founders say
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight">
              Don't take our word for it.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <p className="font-display text-xl font-light text-dark italic leading-snug mb-4">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-sans text-sm font-semibold text-dark">{t.name}</p>
                  <p className="font-mono text-[11px] tracking-[0.1em] text-stone uppercase">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Teaser */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral block mb-4">
              From the blog
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight">
              Thinking out loud about <em className="italic text-coral">brand</em>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                tag: 'Brand Strategy',
                title: 'Why most founder websites fail before anyone reads a word',
                date: 'Coming soon',
              },
              {
                tag: 'Process',
                title: 'The 10-day brand sprint: what happens, and why it works',
                date: 'Coming soon',
              },
              {
                tag: 'Design',
                title: 'Design tokens: the unsexy foundation every growing brand needs',
                date: 'Coming soon',
              },
            ].map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                className="group cursor-not-allowed"
              >
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-coral block mb-2">
                  {post.tag}
                </span>
                <h3 className="font-sans text-sm font-semibold text-dark leading-snug mb-2 group-hover:text-coral transition-colors duration-150">
                  {post.title}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.1em] text-stone uppercase">
                  {post.date}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest text-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl lg:text-5xl font-light text-cream leading-tight mb-6 max-w-xl mx-auto">
              Ready to build something worth{' '}
              <em className="italic text-coral">believing in</em>?
            </h2>
            <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
              30 minutes. No pressure. We'll tell you honestly if we're a good fit.
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
