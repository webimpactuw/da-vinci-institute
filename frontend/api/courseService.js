const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createOrUpdateCourseProgress = async (course_id, last_completed_slide, is_completed) => {
    const res = await fetch(`${API_URL}/course_progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({ course_id, last_completed_slide, is_completed }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.detail || "Something went wrong while saving course progress");
    }

    return data;
};

export const getUsersCourseProgress = async () => {
    const res = await fetch(`${API_URL}/course_progress`, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        credentials: 'include',
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.detail || "Something went wrong while fetching course progress");
    }

    return data;
};
