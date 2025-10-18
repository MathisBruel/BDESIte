# Repository Guidelines

## Project Structure & Module Organization
This Next.js 14 app uses the App Router in `app/`. Top-level directories map to pages such as `app/evenements` and `app/partenaires`, while layout concerns live in `app/layout.tsx` and shared styles in `app/globals.css`. Shared UI is centralized in `components/` (e.g., `Header`, `Badge`, `Section`). Data is sourced from JSON fixtures in `data/` and normalized through helper functions in `lib/data.ts`; keep updates synchronized between these folders. Static assets, icons, and SEO imagery belong in `public/` (group under `public/images/...` for clarity).

## Build, Test, and Development Commands
Use Node 18+ with npm.
- `npm run dev`: launch the dev server at http://localhost:3000 with hot reload.
- `npm run build`: compile for production; run before deploying to catch type or ESLint errors emitted by Next.
- `npm run start`: serve the production build locally for smoke testing.
- `npm run lint`: run Next.js ESLint suite; required to pass CI.
- `npm run format`: apply Prettier to TS/JS/CSS/MD files; run before committing non-trivial edits.

## Coding Style & Naming Conventions
Follow Prettier defaults (2-space indent, double quotes, semicolons). Use TypeScript strictness already configured in `tsconfig.json`; favor explicit types for exported functions. Components should remain function components with PascalCase names and live in their own files under `components/`. Tailwind utility classes power styling—group related utilities logically and avoid unused classes. For data objects, match the schemas in `lib/schemas.ts` and keep keys in camelCase.

## Testing Guidelines
No automated tests exist yet; new features should include React Testing Library or integration tests under `__tests__/` mirroring route structure. Name files `*.test.tsx` and colocate near the code or under `app/__tests__`. Exercise critical flows (event listing, partner fetch, smooth scroll). Manual QA: verify pages in light/dark backgrounds and mobile breakpoints after every change.

## Commit & Pull Request Guidelines
Recent history uses short, descriptive statements (e.g., `legal mentions`). Prefer the imperative mood (`Add`, `Update`) with contextual scope (`Add hero animations`). Keep changes cohesive per commit. Pull requests must explain the change, list key routes to retest, and link Jira/GitHub issues. Include screenshots or recordings for UI changes and note any content updates in `data/` so reviewers can refresh fixtures.
