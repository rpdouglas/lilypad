// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#2C3E2D',
        coral: '#E8614A',
        cream: '#FAF8F4',
        stone: '#8A9080',
        dark: '#1A2418',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Outfit', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
};

 