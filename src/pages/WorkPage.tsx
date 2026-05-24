// Persona: Sarah (primary — scans for social proof and outcomes)
// Persona: Marcus (secondary — evaluates methodology depth before engaging)
// Route: /work

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCaseStudies } from '@/lib/content/case-studies'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
}

const studies = getCaseStudies()

export default function WorkPage() {
  return (
    <>
      <title>Case Studies | Lily Pad Strategy & Design</title>
      <meta name="description" content="Real outcomes for real founders. See how Lily Pad turns positioning clarity into measurable results." />

      {/* Page Hero */}
      <section className="bg-forest text-cream pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-6">
              Case Studies
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight text-cream mb-6 max-w-xl">
              Work that{' '}
              <em className="italic text-coral">speaks</em> for itself.
            </h1>
            <p className="font-sans text-base text-stone leading-relaxed max-w-md">
              Every project starts with a problem. Every case study ends with a
              number. Here's what we've built — and what it actually did.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          {studies.length === 0 ? (
            <p className="font-sans text-base text-stone">Case studies coming soon.</p>
          ) : (
            <div className="space-y-10">
              {studies.map((study, i) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                >
                  <Link
                    to={`/work/${study.slug}`}
                    className="group block bg-white rounded-lg shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow duration-150"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral">
                            {study.client}
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone">
                            {study.industry}
                          </span>
                        </div>
                        <h2 className="font-display text-2xl lg:text-3xl font-normal text-forest leading-tight mb-3 group-hover:text-coral transition-colors duration-150">
                          {study.title}
                        </h2>
                        <p className="font-sans text-sm text-stone leading-relaxed mb-4">
                          {study.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {study.services.map(s => (
                            <span
                              key={s}
                              className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone border border-stone/30 px-2 py-1 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 lg:mt-0 lg:w-48 lg:shrink-0 lg:text-right">
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone block mb-2">
                          The result
                        </span>
                        <p className="font-display text-lg font-light text-coral italic leading-snug">
                          {study.result}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-cream leading-tight mb-4">
              Want results like{' '}
              <em className="italic text-coral">these</em>?
            </h2>
            <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
              Book a free discovery call. We'll tell you honestly if we can help.
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
