// Persona: Marcus (primary — desktop, process-oriented, needs specifics to justify budget)
// Persona: Sarah (secondary — mobile, decision-making)
// Route: /services

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
    slug: 'brand-strategy',
    number: '01',
    title: 'Brand Strategy',
    headline: 'Clarity before a single pixel.',
    description:
      "Most brands fail because they skip the strategy and go straight to the logo. We don't. Every engagement starts with a positioning workshop to define exactly who you are, who you serve, and why you're the right choice.",
    deliverables: [
      'Positioning workshop (remote or in-person)',
      'Competitive landscape audit',
      'Target audience definition',
      'Messaging architecture',
      'Brand voice & tone guidelines',
    ],
    outcome: "You'll leave with a single clear sentence that explains what you do and why it matters — and a framework to apply it everywhere.",
  },
  {
    slug: 'web-development',
    number: '02',
    title: 'Web Development',
    headline: 'A site that works as hard as you do.',
    description:
      'We build fast, accessible, conversion-focused sites using React, Vite, and Tailwind CSS. Every page is built on strategy first — we know what each page needs to do before we write a line of code.',
    deliverables: [
      'Architecture and information design',
      'Responsive design (375px → 1440px)',
      'Accessibility-first development (WCAG AA)',
      'Performance optimization (Core Web Vitals)',
      'CMS integration (if needed)',
    ],
    outcome: 'A site that loads fast, converts visitors, and you can actually maintain.',
  },
  {
    slug: 'design-systems',
    number: '03',
    title: 'Design Systems',
    headline: 'Build once. Stay consistent, forever.',
    description:
      'Growing brands hit a wall when every new page looks slightly different from the last. A design system solves that. We build component libraries, token sets, and documentation that keep your team aligned as you scale.',
    deliverables: [
      'Brand token library (colors, typography, spacing)',
      'Component library (React or framework-agnostic)',
      'Usage documentation',
      'Figma component kit',
      'Handoff and onboarding session',
    ],
    outcome: 'Your design decisions are made once and applied everywhere — no more brand drift.',
  },
  {
    slug: 'launch-packages',
    number: '04',
    title: 'Launch Packages',
    headline: 'Everything you need to enter the market.',
    description:
      "Our Launch Package bundles strategy, identity, and site into a single focused sprint. Designed for founders who need to move fast without sacrificing quality — and who can't afford to run three separate vendor relationships.",
    deliverables: [
      'Brand strategy sprint (5 days)',
      'Full visual identity (logo, colors, typography)',
      'Marketing site (up to 5 pages)',
      'Copywriting direction',
      '30-day post-launch support',
    ],
    outcome: 'A complete brand foundation delivered in 4–6 weeks. Ready to pitch, publish, and grow.',
  },
]

const PROCESS_FAQ = [
  {
    q: 'How long does a typical project take?',
    a: 'Brand Strategy: 1–2 weeks. Web Development: 3–6 weeks. Launch Package: 4–6 weeks. Design Systems: 3–5 weeks depending on scope.',
  },
  {
    q: 'Do you work with early-stage founders?',
    a: "Yes — most of our clients are pre-seed to Series A. We're built for founders who need to move fast and build something that lasts.",
  },
  {
    q: 'What does a typical engagement look like?',
    a: "We start every project with a discovery call. If we're a fit, we scope the work, align on timeline, and kick off with a structured workshop. You'll always know what's happening and why.",
  },
  {
    q: 'Do you offer retainers?',
    a: "We offer ongoing design and strategy retainers for clients who've completed a project with us. Ask about availability on your discovery call.",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-forest text-cream pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-6">
              What we do
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight text-cream mb-6 max-w-xl">
              Four services. One{' '}
              <em className="italic text-coral">focused</em> goal.
            </h1>
            <p className="font-sans text-base text-stone leading-relaxed max-w-md">
              Everything we offer is built around the same outcome: giving founders
              a brand that earns trust and drives decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Blocks */}
      {SERVICES.map((service, i) => (
        <section
          key={service.slug}
          className={i % 2 === 0 ? 'bg-cream' : 'bg-cream-alt'}
        >
          <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <motion.div {...fadeUp}>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-coral">
                  {service.number}
                </span>
                <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight">
                  {service.title}
                </h2>
              </div>
              <p className="font-sans text-base text-coral font-normal mb-4 leading-snug max-w-md">
                {service.headline}
              </p>
              <p className="font-sans text-base text-dark leading-relaxed max-w-xl mb-8">
                {service.description}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mb-4">
                    What's included
                  </h3>
                  <ul className="space-y-2">
                    {service.deliverables.map(d => (
                      <li key={d} className="flex items-start gap-3">
                        <span className="text-coral font-mono text-sm mt-0.5 shrink-0">—</span>
                        <span className="font-sans text-sm text-dark leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-forest/5 border border-forest/10 rounded-lg p-6">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mb-3">
                    The outcome
                  </h3>
                  <p className="font-display text-xl font-light text-forest italic leading-snug">
                    "{service.outcome}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="bg-forest text-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-4">
              Common questions
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-cream leading-tight">
              What founders usually ask <em className="italic text-coral">first</em>.
            </h2>
          </motion.div>

          <div className="space-y-8">
            {PROCESS_FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                className="border-b border-stone/20 pb-8"
              >
                <h3 className="font-sans text-sm font-semibold text-cream mb-2">
                  {item.q}
                </h3>
                <p className="font-sans text-sm text-stone leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-forest leading-tight mb-4">
              Not sure where to <em className="italic text-coral">start</em>?
            </h2>
            <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
              Book a free discovery call. We'll listen first, then tell you
              honestly what you actually need.
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
