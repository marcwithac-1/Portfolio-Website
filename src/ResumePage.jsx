import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myVideoFile from "./assets/buildings red.mp4";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "University / Coursework", rank: 3 },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "Frontend / Design / UI", rank: 4 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "Featured Work", rank: 5 },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "Internships / Roles", rank: 2 },
];

const EDUCATION_ROWS = [
  { index: "01", title: "General Education", status: "Complete" },
  { index: "02", title: "Computer Science Core", status: "In Progress" },
  { index: "03", title: "Elective Track", status: "Queued" },
  { index: "04", title: "Capstone Prep", status: "Pending" },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen" className="p5-bg-container">
      {/* MP4 Video Background */}
      <video 
        className="p5-video-bg" 
        src={myVideoFile} 
        autoPlay 
        loop 
        muted 
        playsInline 
      />
      <div className="p5-video-overlay" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        /* Persona 5 Theme Background */
        .p5-bg-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #0b0b0b;
        }

        .p5-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .p5-video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45); /* Adjust opacity to darken the video if needed */
          z-index: 2;
          pointer-events: none;
        }

        .p5-background {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(135deg, #800e13 0%, #1a0203 50%, #000000 100%);
          overflow: hidden;
        }

        /* Moving Red Slanted Vertical Lines */
        .p5-red-stripes {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            -75deg,
            transparent,
            transparent 35px,
            rgba(217, 4, 41, 0.35) 35px,
            rgba(217, 4, 41, 0.35) 70px,
            rgba(0, 0, 0, 0.6) 70px,
            rgba(0, 0, 0, 0.6) 85px,
            rgba(239, 35, 60, 0.5) 85px,
            rgba(239, 35, 60, 0.5) 120px
          );
          transform: rotate(15deg);
          animation: p5StripeMove 18s linear infinite;
        }

        @keyframes p5StripeMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 500px 500px;
          }
        }

        /* Subtle Halftone Pattern Overlay for P5 comic texture */
        .p5-halftone {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
        }

        .p5-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.85) 100%);
          pointer-events: none;
        }

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-fill {
          position: absolute;
          inset: 0;
          background: #d90429;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.5);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #111111;
          border-left: 6px solid #d90429;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(0, 0, 0, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d90429;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #d90429;
          border: 3px solid #ffffff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.4);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #ffffff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000000;
          border-color: #000000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #ffffff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #ff4d6d;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #ff4d6d;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #ffffff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(20, 2, 4, 0.96) 0%, rgba(10, 1, 2, 0.97) 100%);
          border-left: 6px solid #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(217, 4, 41, 0.3),
            16px 16px 0 rgba(0, 0, 0, 0.85);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(217, 4, 41, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #d90429 0%, #ef233c 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #ffffff;
          box-shadow: 10px 0 0 rgba(0, 0, 0, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(20, 2, 4, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(239, 35, 60, 0.25);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(40, 4, 8, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #ff4d6d;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
-          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #ffffff;
          background: #d90429;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(15, 2, 3, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(239, 35, 60, 0.25);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #ff4d6d;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
          
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">EDUCATION LOG</div>
              <div className="resume-detail-top-progress">7/5</div>
            </div>

            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">Maintain progress across required classes and supporting work.</div>
                <div className="resume-detail-bullet">Track portfolio-ready projects tied to coursework and labs.</div>
                <div className="resume-detail-bullet">Keep materials prepared for internships, research, and review.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}