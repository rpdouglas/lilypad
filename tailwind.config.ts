// Reference only — active theme tokens are defined via @theme in src/index.css.
// Keep in sync with docs/BRAND-TOKENS.md.
export default {
  theme: {
    extend: {
      colors: {
        forest:        '#2C3E2D',
        'forest-mid':  '#3D5240',
        coral:         '#E8614A',
        'coral-light': '#F08070',
        cream:         '#FAF8F4',
        'cream-alt':   '#F0EDE6',
        stone:         '#8A9080',
        dark:          '#1A2418',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans:    ['Outfit', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      boxShadow: {
        coral: '0 0 0 4px rgba(232, 97, 74, 0.25)',
      },
      maxWidth: {
        content: '900px',
      },
    },
  },
};
