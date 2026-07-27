import Link from "next/link";
import CourseViewer from "@/components/CourseViewer";
import { client } from "@/sanity/lib/client";

export default async function CoursePage({ params }) {
  const { category, courseId } = await params;

  const query = `*[_type == "course" && slug.current == $courseId][0]{
    title,
    slides[]
  }`;

  const course = await client.fetch(query, { courseId });

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

  return (
    <CourseViewer
      category={category}
      courseId={courseId}
      courseTitle={course.title}
      slides={course.slides || []}
    />
  );
}
