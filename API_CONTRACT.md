# Cosmic Campsite API Contract

This document records the API that is implemented in the current project. It describes code behavior; it does not claim that MongoDB is running or that requests have been tested against a live server.

## Configuration

- Default API base URL: `http://localhost:5000/api` (`frontend/account-data.js`).
- The frontend may override it by setting `window.COSMIC_API_URL` **before** `account-data.js` runs.
- The backend uses `PORT` or defaults to port `5000` (`backend/server.js`).
- MongoDB uses `MONGODB_URI`, with a local fallback configured in `backend/config/db.js`.
- Authentication requires `ACCESS_TOKEN_SECRET` to be at least 32 characters. Set it through the backend environment; never put its value in this document or source control.
- The server enables CORS with reflected request origins and does not enable credentialed cookies. The frontend sends a bearer token instead.
- JSON request bodies are parsed with a 300 KB limit.

## Authentication header

Protected requests use:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

The token is issued by registration/login, signed by the backend, and expires after seven days. `frontend/account-data.js` reads the session from local storage and adds the header when a token exists. It removes a saved session and dispatches `cosmic-auth-expired` after a protected request returns `401`.

## Endpoints

All paths below are relative to the API base URL, except the root health check.

| Method and path | Purpose and frontend caller | Authentication | Status |
|---|---|---|---|
| `GET /` | Backend health-check text. No frontend feature calls it. | No | Implemented in `backend/server.js`. |
| `POST /users/register` | Register form via `frontend/auth.js` and `CosmicAccount.request`. | No | Implemented. |
| `POST /users/login` | Login form via `frontend/auth.js` and `CosmicAccount.request`. | No | Implemented. |
| `GET /users/me` | Return current public account. No current frontend caller found. | Yes | Implemented. |
| `PATCH /users/profile` | Save Progress page name/avatar edits via `frontend/progress.js` and `account-data.js`. | Yes | Implemented. |
| `GET /progress` | Hydrate quiz, mission, and profile data on the Progress page. | Yes | Implemented. |
| `POST /progress/quizzes` | Save signed-in quiz attempts from `frontend/quiz.js`. | Yes | Implemented. |
| `POST /progress/missions` | Save signed-in mission activity from `frontend/missions.js`. | Yes | Implemented. |

No separate `/missions` or `/quizzes` API is implemented. The mission and quiz route/controller files are empty placeholders and are not mounted by `server.js`. Their history is handled by the Progress endpoints below.

## Request and response details

Examples show the application-level JSON shape. IDs, tokens, dates, and other values are illustrative placeholders, not credentials.

### `GET /`

No request body or authentication. Response is plain text:

```text
Cosmic Campsite Backend is Running!
```

### `POST /users/register`

Request (`frontend/auth.js` sends `name` only in register mode):

```json
{
  "email": "student@example.com",
  "password": "example-password",
  "name": "Cosmic Explorer"
}
```

Success is `201 Created`:

```json
{
  "token": "<signed-access-token>",
  "user": {
    "id": "<user-id>",
    "email": "student@example.com",
    "name": "Cosmic Explorer",
    "avatar": ""
  }
}
```

### `POST /users/login`

Request:

```json
{
  "email": "student@example.com",
  "password": "example-password"
}
```

Success is `200 OK` with the same `{ "token", "user" }` shape as registration.

### `GET /users/me`

Requires the authentication header. Success is `200 OK`:

```json
{
  "user": {
    "id": "<user-id>",
    "email": "student@example.com",
    "name": "Cosmic Explorer",
    "avatar": ""
  }
}
```

### `PATCH /users/profile`

Requires authentication. Send one or both supported fields. `name` must be 1–24 characters after trimming. A non-empty `avatar` must be a PNG, JPEG, WebP, or GIF base64 data URL within the controller's length limit.

```json
{
  "name": "Luna Explorer",
  "avatar": "data:image/jpeg;base64,<image-data>"
}
```

Success is `200 OK` with `{ "user": { "id", "email", "name", "avatar" } }`.

### `GET /progress`

Requires authentication. Success is `200 OK`:

```json
{
  "quizAttempts": [],
  "missionHistory": [],
  "profile": {
    "name": "Cosmic Explorer",
    "avatar": ""
  }
}
```

The controller returns each history array in reverse storage order.

### `POST /progress/quizzes`

Requires authentication. `frontend/quiz.js` sends this shape through `account-data.js`:

```json
{
  "date": "2026-11-16T12:00:00.000Z",
  "level": "Explorer",
  "score": 8,
  "total": 10,
  "percentage": 80,
  "topics": {
    "Planets": { "correct": 4, "total": 5 },
    "NASA": { "correct": 4, "total": 5 }
  }
}
```

Success is `201 Created`:

```json
{
  "attempt": {
    "id": "<generated-attempt-id>",
    "date": "<server-generated-ISO-date>",
    "level": "Explorer",
    "score": 8,
    "total": 10,
    "percentage": 80,
    "topics": {
      "Planets": { "correct": 4, "total": 5 }
    }
  }
}
```

The backend validates integer `score` and `total`, requires `1 <= total <= 100` and `0 <= score <= total`, and derives `percentage` and `date` itself. Thus the client-sent `date` and `percentage` are currently ignored. `level` defaults to `Explorer` and is limited to 20 characters. The backend keeps at most the latest 50 attempts per user.

### `POST /progress/missions`

Requires authentication. `frontend/missions.js` sends:

```json
{
  "id": "apollo-11",
  "name": "Apollo 11",
  "planet": "Moon",
  "status": "Completed",
  "date": "2026-11-16T12:00:00.000Z"
}
```

Success is `200 OK`:

```json
{
  "activity": {
    "id": "apollo-11",
    "name": "Apollo 11",
    "planet": "Moon",
    "status": "Completed",
    "date": "<server-generated-ISO-date>"
  }
}
```

The controller validates the ID format, requires a name, and accepts only `Explored` or `Completed`. It generates the date, upserts by mission ID, preserves an existing `Completed` status, and keeps at most 100 history entries per user. The client-sent date is ignored.

## Errors implemented

Application errors use a JSON message field. The backend error middleware in `backend/server.js` returns a generic message for status 500 and forwards non-500 status messages.

| Status | When returned | Example response shape |
|---|---|---|
| `400` | Invalid registration/login input, invalid profile name/avatar, invalid quiz result, or invalid mission activity. | `{ "message": "..." }` |
| `401` | Invalid login credentials, missing/expired/invalid bearer token, or account not found for the token. | `{ "message": "..." }` |
| `409` | Registration email already exists. | `{ "message": "An account with this email already exists. Sign in instead." }` |
| `503` | Token secret is absent or shorter than 32 characters when account/token work is attempted. | `{ "message": "Account authentication is not configured. Set ACCESS_TOKEN_SECRET to at least 32 characters." }` |
| `404` | Unmatched route. | `{ "message": "API route not found." }` |
| `500` | Unhandled database or server error. | `{ "message": "The server could not complete that request." }` |

The controllers also map Mongoose validation errors during registration to `400`. The server has a 300 KB JSON body limit; oversized/malformed body parser responses are not normalized by a dedicated handler.

## Frontend integration status and mismatches

- **Authentication is wired in code:** Login/Register pages load `account-data.js` and `auth.js`; `auth.js` posts to `/users/login` or `/users/register`, stores the returned session, then navigates to Progress.
- **Progress is wired in code:** `progress.js` initially renders local storage, hydrates from `GET /progress` for signed-in users, and posts name/avatar changes through `PATCH /users/profile`.
- **Quiz persistence is wired for signed-in users:** quiz interactions and scoring run locally; completed attempts are saved locally and also posted to `/progress/quizzes` when a session exists. The backend ignores the client date and percentage and returns its canonical values. The current helper does not replace its local latest attempt with the returned server attempt; next hydration returns the server copy.
- **Mission persistence is wired for signed-in users:** mission interactions and history run locally and call `/progress/missions` when signed in. The server upserts by mission ID. There is no standalone mission API or mission catalog endpoint.
- **Other pages:** Home, Planet Explorer, and Journey load `account-data.js` for session-aware account navigation, but no planet or journey data API calls were found.
- **No logout endpoint exists:** sign-out is implemented client-side by deleting the saved session.
- **Error behavior:** the shared request helper throws on non-2xx and clears the saved session on protected `401` responses. The pages generally show a local/offline or sync warning and keep their local data.
- **Potential issue to coordinate:** on quiz save, `percentage` and `date` are redundant because the backend recalculates them. This is not a blocking mismatch, but the team should either document that canonical behavior (current contract) or later simplify the client payload with Habiba/Basmala agreement.
- **Potential data-model limitation:** progress records are embedded as `Mixed` arrays on User, not strongly typed separate documents. Preserve this current architecture unless the team explicitly agrees a requirement needs a change.
- **No client uses `GET /users/me` today.** It is implemented but currently unused.
- **No independent mission/quiz routes are implemented.** Do not document or call the empty placeholder route files as working APIs.

## Ownership of follow-up work

- **Basmala:** owns `backend/config/db.js`, `backend/models/User.js`, `backend/middleware/auth.js`, `backend/controllers/userController.js`, and `backend/routes/userRoutes.js`. No changes to these files are required by this contract audit.
- **Habiba:** owns `backend/controllers/progressController.js` and `backend/routes/progressRoutes.js`, including agreement on validation and the quiz/mission progress payloads. This contract records current behavior; it does not request a controller or route change.
- **Samaa:** owns `backend/server.js` integration coordination, API documentation (including this file), frontend/backend contract coordination, and integration testing. Server changes wait until this contract is reviewed and agreed upon.

## Relevant implementation references

- `frontend/account-data.js`: base URL, bearer header, common request/error handling, progress helper calls.
- `frontend/auth.js`: login/register request payloads and session handling.
- `frontend/quiz.js`: local quiz attempt construction and authenticated save.
- `frontend/missions.js`: local mission activity construction and authenticated save.
- `frontend/progress.js`: hydration and profile update calls.
- `backend/server.js`: middleware, route mounting, 404/error handling, startup.
- `backend/routes/userRoutes.js`, `backend/routes/progressRoutes.js`: actual route declarations and auth requirements.
- `backend/controllers/userController.js`, `backend/controllers/progressController.js`: validation and response behavior.
- `backend/middleware/auth.js`: token creation, verification, and protected request handling.
- `backend/models/User.js`, `backend/config/db.js`: persisted structure and MongoDB connection.
