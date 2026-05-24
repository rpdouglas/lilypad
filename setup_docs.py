import os
import json

# ── .prettierrc ───────────────────────────────────────────────────
prettierrc = """{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid"
}
"""

# ── .prettierignore ───────────────────────────────────────────────
prettierignore = """# Build output
dist
build

# Dependencies
node_modules
functions/node_modules

# Firebase
.firebase
firebase-debug.log
firestore-debug.log

# Generated files
*.min.js
*.min.css
coverage

# Docs — don't reformat markdown tables
docs/**/*.md
"""

# ── eslint.config.js ──────────────────────────────────────────────
eslint_config = """import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'functions'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // General
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
)
"""

# ── vitest.config.ts ──────────────────────────────────────────────
vitest_config = """import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
"""

# ── src/test/setup.ts ─────────────────────────────────────────────
test_setup = """import '@testing-library/jest-dom'

// Mock Firebase to prevent real network calls during tests
vi.mock('./lib/firebase/config', () => ({
  auth:    {},
  db:      {},
  storage: {},
}))

// Suppress console.error in tests unless explicitly needed
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning:')
    ) return
    originalError(...args)
  }
})

afterAll(() => {
  console.error = originalError
})
"""

# ── Example component test ────────────────────────────────────────
# src/components/ui/Button.test.tsx
button_test = """// Persona: all — Button is used across every page
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button>Start a Project</Button>)
    expect(screen.getByText('Start a Project')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled').closest('button')).toBeDisabled()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByText('Primary').closest('button')
    expect(btn).toHaveClass('bg-coral')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant='secondary'>Secondary</Button>)
    const btn = screen.getByText('Secondary').closest('button')
    expect(btn).toHaveClass('border-forest')
  })
})
"""

# ── Stub Button component (so the test above has something to run against) ──
button_component = """// Persona: all — used on every page as the primary CTA element
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary:   'bg-coral text-white hover:bg-coral-light',
  secondary: 'border border-forest text-forest hover:bg-coral-100 bg-white',
  ghost:     'text-coral hover:bg-coral/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'rounded-md font-sans font-medium transition-colors duration-150',
        'focus:outline-none focus:shadow-coral',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
"""

# ── Updated package.json scripts (printed as instructions, not overwritten) ──
package_scripts = {
  "dev":          "vite",
  "build":        "tsc && vite build",
  "preview":      "vite preview",
  "lint":         "eslint src --ext .ts,.tsx",
  "lint:fix":     "eslint src --ext .ts,.tsx --fix",
  "format":       "prettier --write src/**/*.{ts,tsx}",
  "format:check": "prettier --check src/**/*.{ts,tsx}",
  "test":         "vitest run",
  "test:watch":   "vitest",
  "test:coverage":"vitest run --coverage",
  "test:ui":      "vitest --ui",
}

# ── File map ──────────────────────────────────────────────────────
files = {
    '.prettierrc':                          prettierrc,
    '.prettierignore':                      prettierignore,
    'eslint.config.js':                     eslint_config,
    'vitest.config.ts':                     vitest_config,
    'src/test/setup.ts':                    test_setup,
    'src/components/ui/Button.test.tsx':    button_test,
    'src/components/ui/Button.tsx':         button_component,
}

# ── Write all files ───────────────────────────────────────────────
for path, content in files.items():
    dir_path = os.path.dirname(path)
    if dir_path:
        os.makedirs(dir_path, exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f'✔  {path}')

# ── Install required packages ─────────────────────────────────────
print('\n📦 Installing required dev dependencies...')
os.system(
    'npm install -D '
    '@testing-library/react '
    '@testing-library/jest-dom '
    '@testing-library/user-event '
    '@vitest/coverage-v8 '
    '@vitest/ui '
    'jsdom '
    'typescript-eslint '
    '@eslint/js '
    'globals '
    'eslint-plugin-react-refresh '
)

# ── Print package.json scripts ────────────────────────────────────
print('\n📝 Add these scripts to your package.json:')
print(json.dumps({"scripts": package_scripts}, indent=2))

print('\n✅ ESLint, Prettier, and Vitest configured successfully.')
print('')
print('Verify everything works:')
print('  npm run lint          — should pass with no errors')
print('  npm run format:check  — should pass with no errors')
print('  npm run test          — should run the Button test and pass')
print('  npm run test:coverage — generates coverage report in /coverage')