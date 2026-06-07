"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { TextCard, VideoCard, ImageCard, ImageTextCard, QuizCard } from "@/components/ui/CourseSections";
import { createClient } from "next-sanity";
import { getCourseProgress, getCourseQuizAttempts, saveSlideProgress } from "@/lib/api";

// Minimal Sanity client for client-side fetching
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

/* ── Section renderer ───────────────────────── */
function renderSection(section, index, courseSlug, progressMap, quizMap) {
  const savedProgress = progressMap[index] ?? 0;
  const savedAttempt  = quizMap[index] ?? null;

  const commonProps = { progress: savedProgress, courseSlug, slideIndex: index };

  switch (section._type) {
    case "textCard":
      return (
        <TextCard
          key={index}
          {...section}
          {...commonProps}
          onView={() => {
            // Mark text slides as read (100%) when they appear
            if (savedProgress < 100) {
              saveSlideProgress(courseSlug, index, 100).catch(console.error);
            }
          }}
        />
      );
    case "videoCard":
      return <VideoCard key={index} {...section} {...commonProps} />;
    case "imageCard":
      return <ImageCard key={index} {...section} {...commonProps} />;
    case "imageTextCard":
      return <ImageTextCard key={index} {...section} {...commonProps} />;
    case "quizCard":
      return (
        <QuizCard
          key={index}
          {...section}
          {...commonProps}
          savedAttempt={savedAttempt}
        />
      );
    default:
      return null;
  }
}

export default function CoursePage() {
  const { category, courseId } = useParams();
  const router = useRouter();

  const [course,      setCourse]      = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [progressMap, setProgressMap] = useState({});
  const [quizMap,     setQuizMap]     = useState({});

  // 0 — auth guard: redirect to login if no token
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/accountForm?isLogin=true");
    }
  }, [router]);

  // 1 — fetch course content from Sanity
  useEffect(() => {
    if (!courseId) return;
    const query = `*[_type == "course" && slug.current == $courseId][0]{ title, description, slides[] }`;
    sanityClient
      .fetch(query, { courseId })
      .then(setCourse)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  // 2 — fetch saved progress + quiz attempts from FastAPI
  useEffect(() => {
    if (!courseId) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    getCourseProgress(courseId)
      .then(setProgressMap)
      .catch(console.error);

    getCourseQuizAttempts(courseId)
      .then(setQuizMap)
      .catch(console.error);
  }, [courseId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Course not found.</p>
          <Link href={`/courses/${category}`} className="text-[#003d55] font-semibold hover:underline">
            ← Back to {category}
          </Link>
        </div>
      </main>
    );
  }

  // Overall course progress = average across all slides
  const slideCount = course.slides?.length ?? 0;
  const overallProgress = slideCount
    ? Math.round(
        Object.values(progressMap).reduce((sum, v) => sum + v, 0) / slideCount
      )
    : 0;

  return (
    <main className="min-h-screen bg-white px-4 py-8 max-w-2xl mx-auto" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-4">
        <Link href="/courses" className="hover:text-gray-700 transition-colors">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${category}`} className="hover:text-gray-700 transition-colors capitalize">{category}</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">{course.title}</span>
      </div>

      {/* Overall progress bar */}
      {overallProgress > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4a7c59] h-2 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-10 text-right">{overallProgress}%</span>
        </div>
      )}

      {/* Section cards */}
      <div className="flex flex-col gap-5">
        {course.slides?.map((slide, i) =>
          renderSection(slide, i, courseId, progressMap, quizMap)
        )}
      </div>

    </main>
  );
}
