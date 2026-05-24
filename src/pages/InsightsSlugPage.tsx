// Persona: Marcus (primary — here for methodology depth, assessing whether to engage)
// Persona: Sarah (secondary — landed from a referral, scanning for takeaways)
// Route: /insights/[slug]

import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBlogPosts, getBlogModule } from '@/lib/content/blog'
import { mdxComponents } from '@/components/ui/MDXComponents'

export default function InsightsSlugPage() {
  const { slug } = useParams<{ slug: string }>()
  const posts = getBlogPosts()
  const post = posts.find(p => p.slug === slug)
  const mod = slug ? getBlogModule(slug) : undefined
  const MDXContent = mod?.default

  if (!post || !MDXContent) {
    return (
      <section className="bg-cream py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h1 className="font-display text-4xl text-forest mb-4">Article not found.</h1>
          <Link to="/insights" className="font-sans text-sm text-coral underline underline-offset-4">
            ← Back to Insights
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <title>{post.title} | Lily Pad Strategy & Design</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />

      {/* Hero */}
      <section className="bg-forest text-cream pt-16 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              to="/insights"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-cream transition-colors duration-150 block mb-8"
            >
              ← Insights
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral">
                {post.category}
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone">
                {post.readTime}
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-light leading-tight text-cream max-w-2xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
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
      <section className="bg-forest text-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-normal text-cream leading-tight mb-4">
            Want to put this into{' '}
            <em className="italic text-coral">practice</em>?
          </h2>
          <p className="font-sans text-base text-stone leading-relaxed mb-8 max-w-sm mx-auto">
            Book a free 30-minute call and get an honest read on your positioning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="inline-block font-sans text-sm font-medium bg-coral text-cream px-8 py-4 rounded-md hover:bg-coral-light transition-colors duration-150"
            >
              Book a discovery call
            </Link>
            <Link
              to="/insights"
              className="inline-block font-sans text-sm font-medium text-stone border border-stone/40 px-8 py-4 rounded-md hover:text-cream hover:border-cream transition-colors duration-150"
            >
              Read more articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
