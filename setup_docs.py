import os

# ── Deploy Preview Workflow ───────────────────────────────────────
deploy_preview = """name: Deploy Preview to Firebase

on:
  pull_request:
    branches: [ main ]

jobs:
  build-and-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY:            ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN:        ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID:         ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET:     ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID:${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID:             ${{ secrets.VITE_FIREBASE_APP_ID }}

      - name: Deploy to Firebase Preview Channel
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken:            ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_FRESHNEST_AA51E }}
          projectId:            freshnest-aa51e
          # channelId is auto-generated per PR — posts unique preview URL as PR comment
"""

# ── Deploy Production Workflow ────────────────────────────────────
deploy_production = """name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY:            ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN:        ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID:         ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET:     ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID:${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID:             ${{ secrets.VITE_FIREBASE_APP_ID }}

      - name: Deploy to Firebase Production
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken:            ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_FRESHNEST_AA51E }}
          projectId:            freshnest-aa51e
          channelId:            live
"""

# ── Docs Lint Workflow ────────────────────────────────────────────
docs_lint = """name: Lint Docs

on:
  pull_request:
  push:
    branches: [ main, develop ]

jobs:
  lint-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run markdownlint
        uses: DavidAnson/markdownlint-cli2-action@v16
        with:
          globs: |
            docs/**/*.md
            README.md
            CLAUDE.md

      - name: Check broken links
        uses: lycheeverse/lychee-action@v1
        with:
          args: --no-progress --exclude-loopback docs/**/*.md README.md CLAUDE.md
          fail: true
"""

# ── Markdownlint Config ───────────────────────────────────────────
# Placed in root so markdownlint knows which rules to relax
markdownlint_config = """{
  "MD013": false,
  "MD033": false,
  "MD041": false,
  "MD024": false
}
"""
# MD013 — line length (off: our tables and code blocks are long)
# MD033 — inline HTML (off: we use HTML in some MDX files)
# MD041 — first line must be h1 (off: some docs start with frontmatter)
# MD024 — duplicate headings (off: ADRs reuse heading names like ## Status)

# ── File map ──────────────────────────────────────────────────────
files = {
    '.github/workflows/deploy-preview.yml':    deploy_preview,
    '.github/workflows/deploy-production.yml': deploy_production,
    '.github/workflows/docs-lint.yml':         docs_lint,
    '.markdownlint.json':                      markdownlint_config,
}

# ── Write all files ───────────────────────────────────────────────
for path, content in files.items():
    dir_path = os.path.dirname(path)
    if dir_path:
        os.makedirs(dir_path, exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f'✔  {path}')

print('\n✅ All workflow files created successfully.')
print('')
print('Next steps:')
print('  1. Add your VITE_FIREBASE_* values as GitHub repository secrets:')
print('     GitHub → Settings → Secrets and variables → Actions → New secret')
print('  2. The FIREBASE_SERVICE_ACCOUNT_FRESHNEST_AA51E secret was already')
print('     added automatically when you ran firebase init hosting:github')
print('  3. Commit and push these files to trigger your first workflow run:')
print('     git add .')
print('     git commit -m "ci: add GitHub Actions workflows for preview and production deploy"')
print('     git push origin develop')