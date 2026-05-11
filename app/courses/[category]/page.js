import Link from "next/link";
import { redirect } from "next/navigation";
import { courseData } from "@/lib/courseData";

function CourseCard({ id, course, category }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="bg-gray-200 h-28 w-full flex-shrink-0 flex items-center justify-center text-gray-400">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <rect x="2" y="2" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 26l9-8 6 6 4-4 13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{course.name}</p>
        <p className="text-xs text-gray-500 leading-relaxed flex-1">{course.description}</p>

        {/* Progress bar */}
        {course.progress !== undefined && (
          <div className="mt-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#4a7c59] h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        {/* CTA — links to the course page */}
        <Link
          href={`/courses/${category}/${id}`}
          className="mt-2 self-end text-xs font-bold rounded-full px-4 py-1.5 bg-[#4a7c59] text-white hover:bg-[#3d6b4a] transition-colors"
        >
          {course.status === "resume" ? "Resume" : "Begin"}
        </Link>
      </div>
    </div>
  );
}

export default async function CourseListPage({ params }) {
  const { category } = await params;
  const categoryEntry = courseData[category];

  if (!categoryEntry) {
    redirect("/courses");
  }

  const courseEntries = Object.entries(categoryEntry.courses);

  return (
    <main className="min-h-screen bg-white px-6 py-10" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* Back */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/courses"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Course List
        </Link>
      </div>

      {/* Section heading */}
      <h1
        className="text-xl font-bold text-gray-800 mb-6"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {categoryEntry.label} Courses
      </h1>

      {/* Course grid — 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl">
        {courseEntries.map(([id, course]) => (
          <CourseCard key={id} id={id} course={course} category={category} />
        ))}
      </div>

    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(courseData).map((category) => ({ category }));
}