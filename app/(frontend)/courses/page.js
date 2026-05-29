import Link from "next/link";
import { client } from "@/sanity/lib/client";
import DynamicIcon from "@/components/ui/DynamicIcon";

const courseCategories = [
  { id: "writing",    label: "Writing",    icon: "✏️" },
  { id: "statistics", label: "Statistics", icon: "📊" },
  { id: "biology",    label: "Biology",    icon: "🌱" },
  { id: "music",      label: "Music",      icon: "🎵" },
  { id: "math",       label: "Math",       icon: "📐" },
];

export default async function CourseCategoriesPage() {
  const query = `*[_type == "subject"] {
    subjectName,
    slug,
    "iconName": icon.name,
  }`
  const courseCategories = await client.fetch(query);

  return (
    <main className="min-h-screen bg-white px-6 py-10" style={{ fontFamily: "'Lato', sans-serif" }}>
      <h1
        className="text-2xl font-bold tracking-widest text-gray-800 mb-8"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        Course Categories
      </h1>

      <div className="flex flex-wrap gap-8 pl-8">
        {courseCategories.map((cat) => (
          <Link
            key={cat.slug.current}
            href={`/courses/${cat.slug.current}`}
            className="flex flex-col items-center gap-3 group"
          >
            <div
              className="w-[200px] h-[200px] rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:brightness-90 group-hover:scale-105 shadow-sm"
              style={{ backgroundColor: "#4a7c59" }}
            >
              <div>
                <DynamicIcon iconName={cat.iconName} size={64} className="text-white" />
              </div>
            </div>
            <span className="font-bold text-md text-gray-600 group-hover:text-gray-900 transition-colors">
              {cat.subjectName}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}