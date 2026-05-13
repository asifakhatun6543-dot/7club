# Streammore

A cinematic streaming platform prototype built with Next.js and Prisma.

## Features
- Splash screen with animated Streammore brand.
- Login / signup flow with JWT authentication.
- Home feed with categories, search, filters, and recommendations.
- Short drama vertical feed and VIP locked episodes.
- Watch page with custom player, auto-next, quality controls, and recommendations.
- Profile, downloads, and admin management pages.
- External video support via direct .mp4, m3u8, and embed URLs.
- Secure token-based auth and role-based admin access.

## Setup
1. `npm install`
2. `npx prisma generate`
3. `npx prisma db push`
4. `npm run prisma:seed`
5. `npm run dev`

Open `http://localhost:3000` to view the app.

## Notes
- This app does not store or host video files. All content is served via external links.
- Admin credentials are seeded with `admin@streammore.test` / `Admin123!`.
