# Kanban Board

A React Kanban board for managing projects and tasks.

## Features

- Projects and task boards per project
- Drag and drop tasks between columns
- Create, edit, and delete tasks
- Supabase persistence

## Quick Start

1. Create a `.env.local` file with:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Install dependencies:
   - `pnpm install`
3. Run the app:
   - `pnpm dev`

## Scripts

- `pnpm dev` - start local dev server
- `pnpm test` - run tests
- `pnpm check-all` - typecheck, lint, format, depcheck

## Folder Structure

- `src/features` - feature/domain modules (pages, components, hooks)
- `src/shared` - shared UI, services, utils, state
- `src/api` - Supabase API functions
- `src/assets` - global styles and assets
