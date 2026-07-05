"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TextCard, VideoCard, ImageCard, ImageTextCard, QuizCard } from "@/components/ui/CourseSections";
import { createOrUpdateCourseProgress, getUsersCourseProgress } from "@/api/courseService";

function renderSection(section, index, progress) {
  switch (section._type) {
    case "textCard":
      return <TextCard key={index} {...section} progress={progress} />;
    case "videoCard":
      return <VideoCard key={index} {...section} progress={progress} />;
    case "imageCard":
      return <ImageCard key={index} {...section} progress={progress} />;
    case "imageTextCard":
      return <ImageTextCard key={index} {...section} progress={progress} />;
    case "quizCard":
      return <QuizCard key={index} {...section} progress={progress} />;
    default:
      return null;
  }
}

export default function CourseViewer({ category, courseId, courseTitle, slides }) {
  const totalSlides = slides?.length ?? 0;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadProgress = async () => {
      if (!courseId) {
        if (mounted) setIsLoading(false);
        return;
      }

      try {
        const progressData = await getUsersCourseProgress();
        const savedCount = Math.min(progressData[courseId]?.last_completed_slide ?? 0, totalSlides);
        if (mounted) {
          setCompletedCount(savedCount);
          setCurrentSlideIndex(savedCount >= totalSlides ? Math.max(totalSlides - 1, 0) : savedCount);
          setCourseCompleted(savedCount >= totalSlides);
        }
      } catch (err) {
        console.error("Failed to load course progress:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadProgress();

    return () => {
      mounted = false;
    };
  }, [courseId, totalSlides]);

  const currentSlide = slides?.[currentSlideIndex];
  const progressPercent = totalSlides > 0 ? Math.round((completedCount / totalSlides) * 100) : 0;
  const isLastSlide = currentSlideIndex >= totalSlides - 1;

  const handleNext = async () => {
    if (saving || isLastSlide) return;

    const nextIndex = currentSlideIndex + 1;
    const newCompletedCount = nextIndex;
    const nextIsCompleted = newCompletedCount >= totalSlides;

    setSaving(true);
    setError(null);

    try {
      await createOrUpdateCourseProgress(courseId, newCompletedCount, nextIsCompleted);
      setCurrentSlideIndex(nextIndex);
      setCompletedCount(newCompletedCount);
      setCourseCompleted(nextIsCompleted);
    } catch (err) {
      console.error("Unable to save progress:", err);
      setError(err.message || "Unable to save progress. Try again later.");
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    if (saving || !isLastSlide) return;

    const newCompletedCount = totalSlides;

    setSaving(true);
    setError(null);

    try {
      await createOrUpdateCourseProgress(courseId, newCompletedCount, true);
      setCompletedCount(newCompletedCount);
      setCourseCompleted(true);
    } catch (err) {
      console.error("Unable to complete course:", err);
      setError(err.message || "Unable to complete course. Try again later.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white px-4 py-8 max-w-2xl mx-auto flex items-center justify-center">
        <p className="text-gray-500">Loading course progress...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 max-w-2xl mx-auto" style={{ fontFamily: "'Lato', sans-serif" }}>
      <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/courses" className="hover:text-gray-700 transition-colors">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${category}`} className="hover:text-gray-700 transition-colors capitalize">{category}</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">{courseTitle}</span>
      </div>

      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{courseTitle}</h1>
            <p className="text-sm text-gray-500">Slide {currentSlideIndex + 1} of {totalSlides}</p>
          </div>
          <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            Progress: {progressPercent}%
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-[#4a7c59] transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-5">
        {currentSlide ? renderSection(currentSlide, currentSlideIndex, progressPercent) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No slide available for this course.
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {courseCompleted ? (
            <span className="inline-flex items-center rounded-full bg-[#e8f5ec] px-4 py-2 text-sm font-semibold text-[#276749]">
              Course completed
            </span>
          ) : (
            <span className="text-sm text-gray-500">Continue through the slides to save progress.</span>
          )}
        </div>

        <div className="flex gap-3">
          {!isLastSlide ? (
            <button
              type="button"
              disabled={saving || isLastSlide}
              onClick={handleNext}
              className="rounded-full bg-[#003d55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132f3a] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {saving ? "Saving…" : "Next"}
            </button>
          ) : (
            <button
              type="button"
              disabled={saving || courseCompleted}
              onClick={handleComplete}
              className="rounded-full bg-[#4a7c59] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b624c] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {saving ? "Saving…" : courseCompleted ? "Completed" : "Finish course"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
