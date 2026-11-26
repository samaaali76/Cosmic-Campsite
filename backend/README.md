# Cosmic Campsite account API

The frontend account forms use `COSMIC_API_URL` for the API base. Local development defaults to `http://localhost:5000/api`; the Vercel build supplies the deployed API URL through its environment configuration. User accounts and their quiz and mission history are stored in MongoDB; signed-in browser caches are namespaced by user ID.

## Local setup

1. Start MongoDB locally, or set `MONGODB_URI` to your MongoDB connection string.
2. Copy `.env.example` to `.env` and replace `ACCESS_TOKEN_SECRET` with a private random value of at least 32 characters. Keep `.env` out of version control.
3. From this directory, run `npm install` once, then `npm start`.
4. Serve the `frontend` folder with a local static server and open `login.html` or `register.html`.

## Deployment configuration

- Render: set `MONGODB_URI`, `ACCESS_TOKEN_SECRET`, `CORS_ORIGINS`, and `NODE_ENV`. `CORS_ORIGINS` is a comma-separated list of exact frontend origins; the service listens on Render's `PORT` at `0.0.0.0`.
- Vercel: keep the repository root as the project root so `vercel.json` can run the static build. Set `COSMIC_API_URL` to the deployed API base URL ending in `/api`; the build requires HTTPS and writes the value into the generated `dist/runtime-config.js` file.
- MongoDB Atlas: create a database user, allow network access from the Render service, and use the Atlas connection string as Render's `MONGODB_URI`.

Passwords are stored as salted scrypt hashes. Account API routes require a signed seven-day bearer token.
