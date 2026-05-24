// Persona: Marcus (primary — wants to verify outcomes and methodology before committing)
// Persona: Sarah (secondary — scans for the result, wants to book fast if convinced)
// Route: /work/[slug]

import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCaseStudies, getCaseStudyModule } from '@/lib/content/case-studies'
import { mdxComponents } from '@/components/ui/MDXComponents'

export default function WorkSlugPage() {
  const { slug } = useParams<{ slug: string }>()
  const studies = getCaseStudies()
  const study = studies.find(s => s.slug === slug)
  const mod = slug ? getCaseStudyModule(slug) : undefined
  const MDXContent = mod?.default

  if (!study || !MDXContent) {
    return (
      <section className="bg-cream py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h1 className="font-display text-4xl text-forest mb-4">Case study not found.</h1>
          <Link to="/work" className="font-sans text-sm text-coral underline underline-offset-4">
            ← Back to Work
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <title>{study.title} | Lily Pad Strategy & Design</title>
      <meta name="description" content={study.excerpt} />
      <meta property="og:title" content={study.title} />
      <meta property="og:description" content={study.excerpt} />

      {/* Hero */}
      <section className="bg-forest text-cream pt-16 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              to="/work"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-cream transition-colors duration-150 block mb-8"
            >
              ← Work
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral">
                {study.client}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone">
                {study.industry}
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-light leading-tight text-cream max-w-2xl">
              {study.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-dark border-b border-stone/20">
        <div className="max-w-content mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone block mb-1">
                The result
              </span>
              <p className="font-display text-xl font-light text-coral italic">
                {study.result}
              </p>
            </div>
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
        </div>
      </section>

      {/* Content Body */}
      <section className="bg-cream py-12 lg:py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            className="max-w-2xl"
          >
            <MDXContent components={mdxComponents} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-normal text-forest leading-tight mb-4">
            Want results like{' '}
            <em className="italic text-coral">this</em>?
          </h2>
          <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
            30 minutes. No pressure. We'll tell you honestly if we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="inline-block font-sans text-sm font-medium bg-coral text-cream px-8 py-4 rounded-md hover:bg-coral-light transition-colors duration-150"
            >
              Book a discovery call
            </Link>
            <Link
              to="/work"
              className="inline-block font-sans text-sm font-medium text-stone border border-stone/40 px-8 py-4 rounded-md hover:text-dark hover:border-dark transition-colors duration-150"
            >
              See more work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
