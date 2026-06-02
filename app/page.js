"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQItem from "@/components/ui/Faqitem";

/* ── Course data ── */
const courses = [
  { id: 1, label: "Writing",    icon: "✏️" },
  { id: 2, label: "Statistics", icon: "📊" },
  { id: 3, label: "Biology",    icon: "🌱" },
  { id: 4, label: "Music",      icon: "🎵" },
  { id: 5, label: "Math",       icon: "📐" },
];

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

/* ── Title cycling words ── */
const titleWords = ["Arts", "Sciences", "Humanities"];

export default function HomePage() {
  // Cycling title words
  const [wordIdx, setWordIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % titleWords.length);
        setFading(false);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white text-gray-800" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* ── hero ── */}
      <section className="relative h-[420px] flex items-end justify-center overflow-hidden">
        <Image
          src="/homeBackground.png"
          alt="Da Vinci Institute building"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55" />
        <div className="relative z-10 flex flex-col items-center mb-10">
          <h1
            className="text-white text-5xl md:text-6xl font-light tracking-[0.2em] drop-shadow-lg"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Da Vinci Institute
          </h1>
          <div className="flex flex-col items-center mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
            <span className="text-white text-2xl font-light tracking-widest drop-shadow-lg">of</span>
            <span
              className="text-white text-3xl font-light tracking-widest drop-shadow-lg"
              style={{
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(-6px)" : "translateY(0)",
                display: "inline-block",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {titleWords[wordIdx]}
            </span>
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2
          className="text-center text-3xl font-light tracking-widest mb-10 text-gray-800"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          About Us
        </h2>

        {/* Our Mission */}
        <div className="flex flex-col md:flex-row gap-8 mb-6">
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
              className="text-lg font-semibold mb-3 text-gray-800"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Our Mission
            </h3>
            <hr className="border-t border-gray-200 mb-10" />
            <p className="text-sm text-gray-600 leading-relaxed">
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
      </section>

      {/* ── Courses We Offer ── */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <h2
          className="text-xl font-bold tracking-widest mb-6 text-gray-800"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Courses We Offer
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
          {courses.map((c) => (
            <div key={c.id} className="flex-shrink-0 flex flex-col items-center gap-2">
              <Link
                href="/courses"
                className="w-[140px] h-[140px] bg-[#4a7c59] rounded-lg flex items-center justify-center text-5xl hover:bg-[#3d6b4a] transition-colors"
              >
                {c.icon}
              </Link>
              <span className="text-sm text-gray-600">{c.label}</span>
            </div>
          ))}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <Link
              href="/courses"
              className="w-[140px] h-[140px] bg-[#4a7c59] rounded-lg flex items-center justify-center text-white text-3xl hover:bg-[#3d6b4a] transition-colors"
            >
              →
            </Link>
            <span className="text-sm text-gray-600">More</span>
          </div>
        </div>
        <div className="flex gap-1.5 justify-center mt-5">
          <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" />
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
        </div>
      </section>

      {/* Our Beliefs */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3
            className="text-xl font-bold text-center mb-8 text-gray-800"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Beliefs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {beliefs.map((b, i) => (
              <div
                key={i}
                className="bg-[#003d55] rounded-lg p-5 flex items-center justify-center text-center"
              >
                <p className="text-sm text-white leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#003d55] py-16 px-6">
        <h2
          className="text-center text-3xl font-light tracking-widest text-white mb-10"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="max-w-xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </main>
  );
}