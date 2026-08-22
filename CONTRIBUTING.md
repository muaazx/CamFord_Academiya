# Contributing

Thanks for your interest in improving CamFord Academiya.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Update `.env.local` with the Firebase, Supabase, and EmailJS values you need for local testing.

## Run and validate

- Start the app:

  ```bash
  npm run dev
  ```

- Type-check:

  ```bash
  npm run lint
  ```

- Build production output:

  ```bash
  npm run build
  ```

## Project notes

- Main application logic is in `src/App.tsx`.
- Auth state and login flows are in `src/context/AuthContext.tsx`.
- Firebase and Supabase clients are configured in `src/firebase.ts` and `src/supabase.ts`.
- Vercel deployment behavior is defined in `vercel.json`.

## Submitting changes

1. Keep changes focused and accurate to the existing single-page academy site.
2. Update relevant docs when behavior or setup changes.
3. Open a pull request with:
   - a clear summary,
   - validation steps you ran,
   - and screenshots for UI changes when applicable.
