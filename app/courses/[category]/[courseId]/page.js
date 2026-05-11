import Link from "next/link";
import { TextCard, VideoCard, ImageCard, ImageTextCard, QuizCard } from "@/components/ui/CourseSections";

// Mock course content database.
const courseContent = {
  writing: {
    1: {
      name: "Introduction to Writing",
      category: "writing",
      sections: [
        {
          type: "text",
          heading: "Text Card Section Heading",
          subheading: "Subheading · Term · Subject",
          blocks: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <strong>'Ullamco'</strong> laboris nisi ut aliquip.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          ],
          progress: 65,
        },
        {
          type: "video",
          title: "Video Card Section",
          videoUrl: null, // replace with a real embed URL e.g. "https://www.youtube.com/embed/..."
          progress: 40,
        },
        {
          type: "image",
          title: "Image Card Section",
          imageSrc: null,
          progress: 40,
        },
        {
          type: "imageText",
          title: "Image + Text Card Section",
          text: "Thanks for taking this is the required. Cure ipsum dolor sit amet, consectetur adipiscing elit. In ante eleifend, vulputate id ex. In ante eleifend vulputate. Sed tempor commodo nisl, eget dictum purus condimentum id. Aliquam feugiat nisi at nunc iaculis facilisis ut et libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante eleifend, vulputate id ex. Phasellus facilisis ut et libero.",
          progress: 40,
        },
        {
          type: "quiz",
          title: "Quiz Card Section",
          question: "Question A B C D E F G",
          options: [
            { label: "Answer option A" },
            { label: "Answer option B", correct: true, explanation: "Answer B is correct because it best describes the concept." },
            { label: "Answer option C" },
            { label: "Answer option D" },
          ],
          progress: 0,
        },
      ],
    },
    2: {
      name: "Essay Structure",
      category: "writing",
      sections: [
        {
          type: "text",
          heading: "Essay Structure",
          subheading: "Writing · Term 1 · Core",
          blocks: [
            "A well-structured essay has a clear introduction, body paragraphs, and a conclusion. Each paragraph should focus on a single idea supported by evidence.",
            "The introduction should hook the reader and present a clear thesis statement that the rest of the essay will support.",
          ],
          progress: 0,
        },
        {
          type: "video",
          title: "How to Write a Thesis Statement",
          videoUrl: null,
          progress: 0,
        },
        {
          type: "quiz",
          title: "Essay Quiz",
          question: "Which part of an essay presents the main argument?",
          options: [
            { label: "The conclusion" },
            { label: "The thesis statement", correct: true, explanation: "The thesis is where you state your main argument." },
            { label: "A body paragraph" },
            { label: "The bibliography" },
          ],
          progress: 0,
        },
      ],
    },
  },
  music: {
    1: {
      name: "Music Theory I",
      category: "music",
      sections: [
        {
          type: "text",
          heading: "Introduction to Music Theory",
          subheading: "Music · Term 1 · Foundation",
          blocks: [
            "Music theory is the study of the practices and possibilities of music. It covers the elements of sound: pitch, rhythm, harmony, and form.",
          ],
          progress: 0,
        },
        {
          type: "image",
          title: "The Musical Staff",
          imageSrc: null,
          progress: 0,
        },
        {
          type: "quiz",
          title: "Notes Quiz",
          question: "How many lines does a standard musical staff have?",
          options: [
            { label: "4" },
            { label: "5", correct: true, explanation: "A standard staff has 5 lines and 4 spaces." },
            { label: "6" },
            { label: "7" },
          ],
          progress: 0,
        },
      ],
    },
  },
  biology: {
    1: {
      name: "Cell Biology",
      category: "biology",
      sections: [
        {
          type: "text",
          heading: "The Cell: Unit of Life",
          subheading: "Biology · Term 1 · Foundation",
          blocks: [
            "Cells are the basic structural and functional units of all living organisms. Every living thing — from bacteria to blue whales — is made of cells.",
          ],
          progress: 0,
        },
        {
          type: "imageText",
          title: "Cell Structure",
          text: "Animal cells contain a nucleus, mitochondria, ribosomes, and other organelles enclosed within a cell membrane. Plant cells additionally have a cell wall, chloroplasts, and a large central vacuole.",
          progress: 0,
        },
        {
          type: "quiz",
          title: "Cell Quiz",
          question: "Which organelle is responsible for producing energy in the cell?",
          options: [
            { label: "Nucleus" },
            { label: "Mitochondria", correct: true, explanation: "The mitochondria is known as the powerhouse of the cell." },
            { label: "Ribosome" },
            { label: "Vacuole" },
          ],
          progress: 0,
        },
      ],
    },
  },
  math: {
    1: {
      name: "Algebra I",
      category: "math",
      sections: [
        {
          type: "text",
          heading: "Introduction to Algebra",
          subheading: "Math · Term 1 · Core",
          blocks: [
            "Algebra is the branch of mathematics dealing with symbols and the rules for manipulating those symbols to solve equations.",
          ],
          progress: 0,
        },
        {
          type: "video",
          title: "Solving Linear Equations",
          videoUrl: null,
          progress: 0,
        },
        {
          type: "quiz",
          title: "Algebra Quiz",
          question: "Solve for x: 2x + 4 = 12",
          options: [
            { label: "x = 3" },
            { label: "x = 4", correct: true, explanation: "2(4) + 4 = 12 ✓" },
            { label: "x = 6" },
            { label: "x = 8" },
          ],
          progress: 0,
        },
      ],
    },
  },
  statistics: {
    1: {
      name: "Descriptive Statistics",
      category: "statistics",
      sections: [
        {
          type: "text",
          heading: "Measures of Central Tendency",
          subheading: "Statistics · Term 1 · Foundation",
          blocks: [
            "Descriptive statistics summarize and describe the main features of a dataset. The three measures of central tendency are the mean, median, and mode.",
          ],
          progress: 0,
        },
        {
          type: "image",
          title: "Normal Distribution Curve",
          imageSrc: null,
          progress: 0,
        },
        {
          type: "quiz",
          title: "Stats Quiz",
          question: "What is the median of [3, 7, 1, 9, 5]?",
          options: [
            { label: "3" },
            { label: "5", correct: true, explanation: "Sorted: 1,3,5,7,9 — the middle value is 5." },
            { label: "7" },
            { label: "9" },
          ],
          progress: 0,
        },
      ],
    },
  },
};

/* ── Section renderer ───────────────────────── */
function renderSection(section, index) {
  switch (section.type) {
    case "text":
      return <TextCard key={index} {...section} />;
    case "video":
      return <VideoCard key={index} {...section} />;
    case "image":
      return <ImageCard key={index} {...section} />;
    case "imageText":
      return <ImageTextCard key={index} {...section} />;
    case "quiz":
      return <QuizCard key={index} {...section} />;
    default:
      return null;
  }
}

export default async function CoursePage({ params }) {
  const { category, courseId } = await params;

  const categoryData = courseContent[category];
  const course = categoryData?.[courseId];

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
        <Link href={`/courses/${category}`} className="hover:text-gray-700 transition-colors capitalize">{course.category}</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">{course.name}</span>
      </div>

      {/* Section cards */}
      <div className="flex flex-col gap-5">
        {course.sections.map((section, i) => renderSection(section, i))}
      </div>

    </main>
  );
}

/* Pre-render known course pages at build time */
export async function generateStaticParams() {
  const paths = [];
  for (const [category, courses] of Object.entries(courseContent)) {
    for (const courseId of Object.keys(courses)) {
      paths.push({ category, courseId });
    }
  }
  return paths;
}