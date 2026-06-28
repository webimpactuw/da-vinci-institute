import Image from "next/image";
import Link from "next/link";
import FAQItem from "@/components/ui/Faqitem";
import { client } from "@/sanity/lib/client";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RotatingText from "@/components/ui/RotatingText.jsx";

/* ── FAQ data ── */
const faqs = [
  {
    q: "Education For All?",
    a: "Da Vinci Institute believes every student deserves access to a world-class education, regardless of background or circumstance.",
  },
  {
    q: "Unlimited Learning?",
    a: "Our curriculum is designed to grow with each student, offering unlimited pathways to explore curiosity and build mastery.",
  },
];

/* ── Beliefs ── */
const beliefs = [
  "Education is the most reliable investment for mankind's quest for progress and success.",
  "Knowledge is the greatest form of currency for the individual.",
  "Each individual is born with an inherent gift; the purpose of education is to identify this gift and to help the individual cultivate it to their maximum potential.",
  "Every individual should have the right to education and equal chances of success; there shall be neither divisions nor discrimination regarding access to resources.",
  "The individual has a responsibility to use their abilities for the general advancement of mankind.",
];

export default async function HomePage() {
  const query = `*[_type == "subject"] {
    subjectName,
    slug,
    "iconName": icon.name,
  }`
  const courses = await client.fetch(query);

  return (
    <main className="bg-white text-gray-800">
      {/* ── Hero ── */}
      <section 
        className="relative w-full h-dvh flex flex-col justify-center items-center overflow-hidden shrink-0"
      >
        <Image
          src="/homeBackground.png"
          alt="Da Vinci Institute building"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55" />
        <h1
          className="relative z-10 text-white text-8xl tracking-[0.2em] mb-4 drop-shadow-lg linden-hill-regular"
        >
          Da Vinci Institute
        </h1>
        <h1
          className="relative z-10 text-white text-6xl tracking-[0.2em] mb-6 drop-shadow-lg linden-hill-regular"
        >
          of
        </h1>
        <RotatingText />
      </section> 

      {/* ── About Us ── */}
      <section className="max-w-5xl min-w-1/2 mx-auto px-6 py-16">
        {/* Our Mission */}
        <div className="flex flex-col md:flex-row gap-8 mb-30">
          <div className="md:w-2/5 flex-shrink-0">
            <Image
              src="/grad.png"
              alt="Graduation"
              width={380}
              height={260}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div className="md:w-3/5">
            <h3
              className="text-3xl font-semibold mb-3 text-gray-800"
            >
              Our Mission
            </h3>
            <hr className="border-black mb-4" />
            <p className="text-md text-gray-600 leading-relaxed">
              Da Vinci Institute seeks to provide personalized education to students all around
              the world who have different learning methods and needs that are not satisfied by
              the public education system. We strive to recognize the potential in each student
              and help them cultivate their talents to make a lasting positive impact on society.
              Through our lessons, we not only hope to educate students, but to help them find
              joy in learning and understanding which will allow them to be true scholars and
              learners in our society.
            </p>
          </div>
        </div>
        
        {/* ── Courses We Offer ── */}
        <section className="mx-auto mb-30">
          <h2
            className="text-3xl font-semibold tracking-widest mb-6 text-gray-800"
          >
            Courses We Offer
          </h2>
          
          <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {courses.map((c) => (
              <div key={c.slug.current} className="shrink-0 flex flex-col items-center gap-2">
                <Link
                  href={`/courses/${c.slug.current}`}
                  className="p-10 bg-[#4a7c59] rounded-lg flex items-center justify-center text-4xl hover:bg-[#3d6b4a] transition-colors"
                >
                  <DynamicIcon iconName={c.iconName} size={72} className="text-white" />
                </Link>
                <span className="text-xl font-semibold text-gray-600">{c.subjectName}</span>
              </div>
            ))}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <Link
                href="/courses"
                className="p-10 bg-[#4a7c59] rounded-lg flex items-center justify-center text-white text-[64px] hover:bg-[#3d6b4a] transition-colors"
              >
                <DynamicIcon iconName={"fa_arrow_right"} size={72} className="text-white" />
              </Link>
              <span className="text-xl font-semibold text-gray-600">More</span>
            </div>
          </div>
        </section>

        {/* Our Beliefs */}
        <h3
          className="text-3xl mb-6 font-semibold text-center text-gray-800"
        >
          Our Beliefs
        </h3>
        <div className="space-y-3 p-2 text-md text-white text-center w-full mx-auto">
          {beliefs.map((b, i) => (
            <div key={i} className="h-20 flex items-center justify-center bg-[#003D55] p-2 w-full rounded-lg">
              <p className="leading-relaxed pr-13 pl-13">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16">
        <h2
          className="text-3xl font-semibold text-center mb-6 text-gray-800"
        >
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}