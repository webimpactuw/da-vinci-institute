"use client";

import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#E3E3E3] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-md text-gray-800 hover:bg-[#D3D3D3] transition-colors"
      >
        {question}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`transition-transform duration-200 text-gray-500 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}