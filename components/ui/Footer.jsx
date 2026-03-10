export default function Footer() {
    return (
      <>
        <style>{`
          .footer {
            background: #1a4a4a;
            color: #fff;
            padding: 48px 80px 36px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
          .footer-col-title {
            font-family: 'Cinzel', serif;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
            letter-spacing: 0.04em;
          }
          .footer-link {
            display: block;
            color: rgba(255,255,255,0.75);
            font-size: 13px;
            margin-bottom: 8px;
            text-decoration: none;
            transition: color 0.15s;
          }
          .footer-link:hover { color: #fff; }
          .footer-donate-btn {
            margin-top: 20px;
            background: #4caf50;
            color: #fff;
            border: none;
            border-radius: 20px;
            padding: 9px 22px;
            font-family: 'Lato', sans-serif;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            letter-spacing: 0.03em;
          }
          .footer-social-row {
            display: flex; align-items: center; gap: 18px; margin-top: 24px;
          }
          .footer-social-icon {
            color: rgba(255,255,255,0.8);
            transition: color 0.15s;
            cursor: pointer;
          }
          .footer-social-icon:hover { color: #fff; }
        `}</style>
  
        <footer className="footer">
          <div>
            <div className="footer-col-title">Da Vinci Istitute</div>
            <a href="/people" className="footer-link">People</a>
            <a href="/mission" className="footer-link">Mission Statement</a>
            <a href="/about" className="footer-link">About</a>
            <button className="footer-donate-btn">Donate</button>
            <div className="footer-social-row">
              {/* Twitter */}
              <svg className="footer-social-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.86a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.5 4.5 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.49 4.49 0 01-2.05-.57v.06c0 2.19 1.56 4.01 3.63 4.43a4.54 4.54 0 01-2.04.08c.57 1.79 2.24 3.09 4.21 3.13A9.05 9.05 0 010 19.54a12.77 12.77 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0023 3z" />
              </svg>
              {/* Instagram */}
              <svg className="footer-social-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              {/* Bluesky / Cloud */}
              <svg className="footer-social-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
              </svg>
            </div>
          </div>
  
          <div>
            <div className="footer-col-title">Contact</div>
            <a href="mailto:" className="footer-link">Email</a>
            <a href="tel:" className="footer-link">Phone number</a>
          </div>
  
          <div>
            <div className="footer-col-title">Course Categories</div>
            <a href="/courses/type-a" className="footer-link">Type A</a>
            <a href="/courses/type-b" className="footer-link">Course Type B</a>
          </div>
        </footer>
      </>
    );
  }