"use client";

import { useState } from "react";

// Shared: progress bar + bookmark footer
function CardFooter({ progress = 0 }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      {/* Bookmark icon */}
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="flex-shrink-0">
        <path d="M1 1h12v16l-6-4-6 4V1z" stroke="#4a7c59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {/* Progress bar */}
      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-[#4a7c59] h-1.5 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-8 text-right">{progress}%</span>
    </div>
  );
}

// text card - Heading + subheading + one or more text blocks
export function TextCard({ heading, subheading, blocks = [], progress = 0 }) {
  return (
    <div className="bg-[#e8edf2] rounded-2xl p-6 flex flex-col gap-4">
      <div className="text-center">
        <h2 className="font-semibold text-gray-800 text-base" style={{ fontFamily: "'Cinzel', serif" }}>
          {heading}
        </h2>
        {subheading && (
          <p className="text-xs text-gray-500 mt-0.5">{subheading}</p>
        )}
      </div>
      {blocks.map((text, i) => (
        <p key={i} className="text-sm text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ))}
      <CardFooter progress={progress} />
    </div>
  );
}

// video card - Title + video embed/placeholder
export function VideoCard({ title, videoUrl, progress = 0 }) {
  return (
    <div className="bg-[#e8edf2] rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-semibold text-gray-800 text-base text-center" style={{ fontFamily: "'Cinzel', serif" }}>
        {title}
      </h2>
      <div className="w-full aspect-video bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Placeholder */
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 14l12 6-12 6V14z" fill="currentColor"/>
            </svg>
            <span className="text-xs">Video</span>
          </div>
        )}
      </div>
      <CardFooter progress={progress} />
    </div>
  );
}

// image card - Title + image
export function ImageCard({ title, imageSrc, imageAlt = "", progress = 0 }) {
  return (
    <div className="bg-[#e8edf2] rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-semibold text-gray-800 text-base text-center" style={{ fontFamily: "'Cinzel', serif" }}>
        {title}
      </h2>
      <div className="w-full aspect-video bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="2" y="2" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 26l9-8 6 6 4-4 13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">Image</span>
          </div>
        )}
      </div>
      <CardFooter progress={progress} />
    </div>
  );
}

// image and text card - Title + side-by-side image and text
export function ImageTextCard({ title, imageSrc, imageAlt = "", text, progress = 0 }) {
  return (
    <div className="bg-[#e8edf2] rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-semibold text-gray-800 text-base" style={{ fontFamily: "'Cinzel', serif" }}>
        {title}
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-2/5 flex-shrink-0 bg-gray-300 rounded-xl overflow-hidden aspect-square sm:aspect-auto flex items-center justify-center min-h-[120px]">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <rect x="2" y="2" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 26l9-8 6 6 4-4 13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs">Image</span>
            </div>
          )}
        </div>
        <p className="sm:w-3/5 text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
      <CardFooter progress={progress} />
    </div>
  );
}

// quiz card - Question + multiple choice options
export function QuizCard({ title = "Quiz Card Section", question, options = [], progress = 0 }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#e8edf2] rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-semibold text-gray-800 text-base" style={{ fontFamily: "'Cinzel', serif" }}>
        {title}
      </h2>
      {question && (
        <p className="text-sm text-gray-500">{question}</p>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect  = submitted && opt.correct && isSelected;
          const isWrong    = submitted && !opt.correct && isSelected;

          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border
                ${isCorrect  ? "bg-green-100 border-green-400 text-green-800" :
                  isWrong    ? "bg-red-100 border-red-400 text-red-800" :
                  isSelected ? "bg-[#003d55] border-[#003d55] text-white" :
                               "bg-white border-gray-200 text-gray-700 hover:border-[#003d55]"}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {selected !== null && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="self-end bg-[#4a7c59] text-white text-xs font-bold rounded-full px-5 py-2 hover:bg-[#3d6b4a] transition-colors"
        >
          Submit
        </button>
      )}
      {submitted && (
        <p className={`text-sm font-medium ${options[selected]?.correct ? "text-green-600" : "text-red-500"}`}>
          {options[selected]?.correct ? "✓ Correct!" : `✗ Incorrect. ${options.find(o => o.correct)?.explanation ?? ""}`}
        </p>
      )}
      <CardFooter progress={progress} />
    </div>
  );
}