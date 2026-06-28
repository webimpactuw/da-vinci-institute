import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#003d55] text-white px-20 pt-12 pb-9 grid grid-cols-3 gap-10">

      {/* Col 1 — Brand */}
      <div>
        <p className="font-cinzel text-base font-semibold tracking-widest mb-4">
          Da Vinci Institute
        </p>
        <Link href="/people"  className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">People</Link>
        <Link href="/mission" className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">Mission Statement</Link>
        <Link href="/about"   className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">About</Link>

        {/* Social icons + Donate on same row */}
        <div className="flex items-center gap-4 mt-6">
          {/* Twitter */}
          <a href="https://twitter.com" aria-label="Twitter" className="text-white/80 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.86a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.5 4.5 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.49 4.49 0 01-2.05-.57v.06c0 2.19 1.56 4.01 3.63 4.43a4.54 4.54 0 01-2.04.08c.57 1.79 2.24 3.09 4.21 3.13A9.05 9.05 0 010 19.54a12.77 12.77 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0023 3z" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
          {/* Bluesky */}
          <a href="https://bsky.app" aria-label="Bluesky" className="text-white/80 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
            </svg>
          </a>
          {/* Donate button — inline with icons */}
          <button className="bg-[#5eb075] text-white text-xs font-bold rounded-full px-4 py-1.5 hover:bg-[#4d9a63] transition-colors tracking-wide">
            Donate
          </button>
        </div>
      </div>

      {/* Col 2 — Contact */}
      <div>
        <p className="font-cinzel text-base font-semibold tracking-widest mb-4">Contact</p>
        <a href="mailto:" className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">Email</a>
        <a href="tel:"    className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">Phone number</a>
      </div>

      {/* Col 3 — Course Categories */}
      <div>
        <p className="font-cinzel text-base font-semibold tracking-widest mb-4">Course Categories</p>
        <Link href="/courses/type-a" className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">Type A</Link>
        <Link href="/courses/type-b" className="block text-white/75 text-sm mb-2 hover:text-white transition-colors">Course Type B</Link>
      </div>

    </footer>
  );
}