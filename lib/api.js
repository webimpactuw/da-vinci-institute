/**
 * Thin wrapper around the FastAPI backend.
 * All calls attach the JWT stored in localStorage.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set. Add it to your .env file.");
}

/** Pull the stored token (client-side only). */
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

/** Base fetch with auth header. Throws on non-2xx responses. */
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }

  return res.json();
}

// ── Progress ──────────────────────────────────────────────────────────────────

/**
 * Fetch all saved slide-progress values for a course.
 * Returns an object keyed by slide_index: { [slideIndex]: progress (0–100) }
 *
 * @param {string} courseSlug
 * @returns {Promise<Record<number, number>>}
 */
export async function getCourseProgress(courseSlug) {
  const data = await apiFetch(`/progress/${courseSlug}`);
  const map = {};
  for (const entry of data.slides) {
    map[entry.slide_index] = entry.progress;
  }
  return map;
}

/**
 * Persist the progress for a single slide.
 *
 * @param {string} courseSlug
 * @param {number} slideIndex
 * @param {number} progress   0–100
 */
export async function saveSlideProgress(courseSlug, slideIndex, progress) {
  return apiFetch(`/progress/${courseSlug}`, {
    method: "POST",
    body: JSON.stringify({ slide_index: slideIndex, progress }),
  });
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

/**
 * Fetch all saved quiz attempts for a course.
 * Returns an object keyed by slide_index: { selectedIndex, isCorrect, submittedAt }
 *
 * @param {string} courseSlug
 * @returns {Promise<Record<number, { selectedIndex: number, isCorrect: boolean, submittedAt: string }>>}
 */
export async function getCourseQuizAttempts(courseSlug) {
  const data = await apiFetch(`/quiz/${courseSlug}`);
  const map = {};
  for (const entry of data) {
    map[entry.slide_index] = {
      selectedIndex: entry.selected_index,
      isCorrect: entry.is_correct,
      submittedAt: entry.submitted_at,
    };
  }
  return map;
}

/**
 * Submit (or overwrite) a quiz answer.  Also auto-marks the slide progress = 100.
 *
 * @param {string}  courseSlug
 * @param {number}  slideIndex
 * @param {number}  selectedIndex  index of the chosen option
 * @param {boolean} isCorrect
 */
export async function submitQuizAnswer(courseSlug, slideIndex, selectedIndex, isCorrect) {
  return apiFetch(`/quiz/${courseSlug}`, {
    method: "POST",
    body: JSON.stringify({
      slide_index: slideIndex,
      selected_index: selectedIndex,
      is_correct: isCorrect,
    }),
  });
}
