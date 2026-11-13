# Cosmic Campsite account API

The frontend account forms use this API at `http://localhost:5000/api`. User accounts and their quiz and mission history are stored in MongoDB; signed-in browser caches are namespaced by user ID.

## Local setup

1. Start MongoDB locally, or set `MONGODB_URI` to your MongoDB connection string.
2. Copy `.env.example` to `.env` and replace `ACCESS_TOKEN_SECRET` with a private random value of at least 32 characters. Keep `.env` out of version control.
3. From this directory, run `npm install` once, then `npm start`.
4. Serve the `frontend` folder with a local static server and open `login.html` or `register.html`.

Passwords are stored as salted scrypt hashes. Account API routes require a signed seven-day bearer token.
