# Da Vinci Institute — API Documentation

Base URL: configured via the `NEXT_PUBLIC_API_URL` environment variable (e.g. `http://localhost:8000` locally).

All protected endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

---

## Table of Contents

1. [Authentication](#authentication)
   - [POST /user](#post-user)
   - [POST /token](#post-token)
2. [Course Progress](#course-progress)
   - [GET /progress/{course_slug}](#get-progresscourse_slug)
   - [POST /progress/{course_slug}](#post-progresscourse_slug)
3. [Quiz Attempts](#quiz-attempts)
   - [GET /quiz/{course_slug}](#get-quizcourse_slug)
   - [POST /quiz/{course_slug}](#post-quizcourse_slug)

---

## Authentication

### POST /user

Create a new user account.

**Auth required:** No

**Request body**
```json
{
  "username": "string",
  "password": "string"
}
```

**Password rules**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character

**Responses**

| Status | Description |
|--------|-------------|
| 200 | User created successfully |
| 400 | Validation error (see `detail` for reason) |

**200 Example**
```json
{ "status": "user created" }
```

**400 Example**
```json
{ "detail": "Please try another username." }
```

---

### POST /token

Log in and receive a JWT access token.

**Auth required:** No

**Request body**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses**

| Status | Description |
|--------|-------------|
| 200 | Login successful, returns token |
| 401 | Invalid username or password |
| 404 | Account is inactive |

**200 Example**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

Store `access_token` in `localStorage` and attach it to all subsequent requests as `Authorization: Bearer <token>`.

---

## Course Progress

Progress is tracked per slide. Each slide in a course has a zero-based `slide_index` and a `progress` value from `0` to `100`.

### GET /progress/{course_slug}

Fetch all saved slide progress values for the current user and a specific course.

**Auth required:** Yes

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_slug` | string | The course's Sanity slug (e.g. `introduction-to-writing`) |

**Responses**

| Status | Description |
|--------|-------------|
| 200 | Returns progress for all tracked slides |
| 401 | Missing or invalid token |

**200 Example**
```json
{
  "course_slug": "introduction-to-writing",
  "slides": [
    { "slide_index": 0, "progress": 100 },
    { "slide_index": 1, "progress": 40 },
    { "slide_index": 4, "progress": 100 }
  ]
}
```

Slides with no saved entry are not included — treat them as `progress: 0` on the frontend.

---

### POST /progress/{course_slug}

Create or update the progress for a single slide. Safe to call repeatedly (upsert).

**Auth required:** Yes

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_slug` | string | The course's Sanity slug |

**Request body**
```json
{
  "slide_index": 2,
  "progress": 75
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `slide_index` | integer | ≥ 0 |
| `progress` | integer | 0 – 100 |

**Responses**

| Status | Description |
|--------|-------------|
| 200 | Slide progress saved, returns updated record |
| 400 | `progress` out of range |
| 401 | Missing or invalid token |

**200 Example**
```json
{
  "slide_index": 2,
  "progress": 75
}
```

---

## Quiz Attempts

One attempt per (user, course, slide) is stored. Re-submitting overwrites the previous answer.  
Submitting a quiz answer **automatically sets that slide's progress to 100**.

### GET /quiz/{course_slug}

Fetch all saved quiz attempts for the current user and a specific course.

**Auth required:** Yes

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_slug` | string | The course's Sanity slug |

**Responses**

| Status | Description |
|--------|-------------|
| 200 | List of quiz attempts (may be empty) |
| 401 | Missing or invalid token |

**200 Example**
```json
[
  {
    "slide_index": 4,
    "selected_index": 1,
    "is_correct": true,
    "submitted_at": "2026-06-06T14:32:10.123456"
  },
  {
    "slide_index": 7,
    "selected_index": 0,
    "is_correct": false,
    "submitted_at": "2026-06-06T14:35:02.654321"
  }
]
```

---

### POST /quiz/{course_slug}

Submit (or overwrite) a quiz answer. Also marks the slide as 100% complete.

**Auth required:** Yes

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_slug` | string | The course's Sanity slug |

**Request body**
```json
{
  "slide_index": 4,
  "selected_index": 1,
  "is_correct": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `slide_index` | integer | Zero-based index of the quiz slide |
| `selected_index` | integer | Index of the option the user chose |
| `is_correct` | boolean | Whether the chosen option was correct |

**Responses**

| Status | Description |
|--------|-------------|
| 200 | Attempt saved, returns the stored record |
| 401 | Missing or invalid token |

**200 Example**
```json
{
  "slide_index": 4,
  "selected_index": 1,
  "is_correct": true,
  "submitted_at": "2026-06-06T14:32:10.123456"
}
```

---

## Error Format

All errors follow FastAPI's standard shape:

```json
{ "detail": "Human-readable error message." }
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request — invalid input |
| 401 | Unauthorized — bad or missing token |
| 404 | Not found — resource or inactive account |
| 422 | Unprocessable entity — malformed request body |
| 500 | Internal server error |

---

## Environment & CORS

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | Yes | Secret used to sign JWTs. Use a long random string. Never commit this. |
| `ALGORITHM` | No | JWT signing algorithm. Defaults to `HS256`. |
| `TOKEN_EXPIRES` | No | Token lifetime in hours. Defaults to `3600`. |
| `DATABASE_URL` | Yes | SQLAlchemy connection string (e.g. `sqlite:///./orm.db`). |
| `ALLOWED_ORIGINS` | No | Comma-separated list of allowed CORS origins. Defaults to `http://localhost:3000`. Set this for staging/production. |

Example for production:
```
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Full base URL of the FastAPI backend. The app will throw at startup if this is missing. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID. |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset name (e.g. `production`). |

### CORS policy

The backend only accepts requests from origins listed in `ALLOWED_ORIGINS`. Allowed methods are `GET`, `POST`, and `OPTIONS`. Allowed headers are `Authorization` and `Content-Type`.

### Security notes

- `.env` files are git-ignored. Never commit them.
- The `SECRET_KEY` must be rotated if compromised — all existing tokens will become invalid.
- All progress and quiz endpoints are scoped to the authenticated user. It is not possible to read or write another user's data.
