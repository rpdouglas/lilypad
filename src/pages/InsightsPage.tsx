// Persona: Marcus (primary — evaluates expertise before booking, reads to assess point of view)
// Persona: Sarah (secondary — quick scan for actionable content)
// Route: /insights

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBlogPosts } from '@/lib/content/blog'

const posts = getBlogPosts()

export default function InsightsPage() {
  return (
    <>
      <title>Insights | Lily Pad Strategy & Design</title>
      <meta name="description" content="Thinking out loud about brand strategy, positioning, and what actually works for early-stage founders." />

      {/* Page Hero */}
      <section className="bg-forest text-cream pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-6">
              Insights
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight text-cream mb-6 max-w-xl">
              Thinking out loud about{' '}
              <em className="italic text-coral">brand</em>.
            </h1>
            <p className="font-sans text-base text-stone leading-relaxed max-w-md">
              No listicles. No hot takes. Just honest thinking about what
              separates brands that earn trust from brands that don't.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Post List */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <p className="font-sans text-base text-stone">Articles coming soon.</p>
          ) : (
            <div className="divide-y divide-stone/20">
              {posts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
                  className="py-8 first:pt-0"
                >
                  <Link
                    to={`/insights/${post.slug}`}
                    className="group block"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral">
                        {post.category}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-sans text-lg font-semibold text-dark leading-snug mb-2 group-hover:text-coral transition-colors duration-150 max-w-2xl">
                      {post.title}
                    </h2>
                    <p className="font-sans text-sm text-stone leading-relaxed max-w-xl">
                      {post.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-alt py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-normal text-forest leading-tight mb-4">
              Ready to build a brand that{' '}
              <em className="italic text-coral">earns trust</em>?
            </h2>
            <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
              Book a free discovery call and find out what's actually holding your brand back.
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
