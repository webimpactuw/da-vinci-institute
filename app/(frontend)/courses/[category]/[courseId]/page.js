import Link from "next/link";
import { TextCard, VideoCard, ImageCard, ImageTextCard, QuizCard } from "@/components/ui/CourseSections";
import { client } from "@/sanity/lib/client";

/* ── Section renderer ───────────────────────── */
function renderSection(section, index) {
  switch (section._type) {
    case "textCard":
      return <TextCard key={index} {...section} />;
    case "videoCard":
      return <VideoCard key={index} {...section} />;
    case "imageCard":
      return <ImageCard key={index} {...section} />;
    case "imageTextCard":
      return <ImageTextCard key={index} {...section} />;
    case "quizCard":
      return <QuizCard key={index} {...section} />;
    default:
      return null;
  }
}

export default async function CoursePage({ params }) {
  const { category, courseId } = await params;

  const query = `*[_type == "course" && slug.current == $courseId][0]{
    title,
    description,
    slides[]
  }`
  const queryParams = { courseId };
  const course = await client.fetch(query, queryParams);

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
    <main className="min-h-screen bg-white px-4 py-8 max-w-2xl mx-auto" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/courses" className="hover:text-gray-700 transition-colors">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${category}`} className="hover:text-gray-700 transition-colors capitalize">{category}</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">{course.title}</span>
      </div>

      {/* Section cards */}
      <div className="flex flex-col gap-5">
        {course.slides.map((slide, i) => renderSection(slide, i))}
      </div>

    </main>
  );
}

/* Pre-render known course pages at build time
export async function generateStaticParams() {
  const paths = [];
  for (const [category, courses] of Object.entries(courseContent)) {
    for (const courseId of Object.keys(courses)) {
      paths.push({ category, courseId });
    }
  }
  return paths;
}
*/