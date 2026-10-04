import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import myVideoFile from "./assets/buildings red3.mp4";

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

const SKILLS_ROWS = [
  { index: "01", title: "Programming Languages", details: "Python, Java, JavaScript, SQL, HTML/CSS, PHP, C/C++" },
  { index: "02", title: "Mobile App Development", details: "Flutter, Dart, Android Studio, Firebase, Mobile UI Development" },
  { index: "03", title: "Developer Tools & Platforms", details: "VS Code, Jupyter Notebook, Google Colab, Power BI, Looker Studio, Roboflow, Figma, Git/GitHub" },
  { index: "04", title: "Frameworks & Libraries", details: "YOLOv8, TensorFlow, Keras, PyTorch, Pandas, NumPy, Matplotlib, Scikit-learn, OpenCV, ByteTrack" },
  { index: "05", title: "Data Analytics & BI", details: "Microsoft Power BI, Google Looker Studio, Dashboard Dev, Data Visualization, KPI Reporting" },
  { index: "06", title: "AI & Automation", details: "Conversational AI, Chatbot Design, Storyflow Dev, Workflow Automation, Machine Learning, Computer Vision, Power Automate" },
  { index: "07", title: "Web & Digital Solutions", details: "Website Migration, Front-End Optimization, Content Management, User Experience Enhancement" },
  { index: "08", title: "Graphic Design & Multimedia", details: "Adobe Photoshop, Premiere Pro, After Effects, Canva, Video Editing, Illustrator, Mixed Media, Content Creation" },
];

const PROJECTS_ROWS = [
  { index: "01", title: "AI Computer Vision System", status: "Deployed" },
  { index: "02", title: "Mobile App Ecosystem", status: "Active" },
  { index: "03", title: "BI & Analytics Dashboard", status: "Complete" },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "Software & AI Developer", status: "Current" },
  { index: "02", title: "UI/UX & Multimedia Intern", status: "Finished" },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const panelRef = useRef(null);

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

  useEffect(() => {
    const checkScrollable = () => {
      const panel = panelRef.current;
      if (panel) {
        const hasOverflow = panel.scrollHeight > panel.clientHeight;
        const isAtBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 10;
        setShowScrollHint(hasOverflow && !isAtBottom);
      }
    };

    const t = setTimeout(checkScrollable, 50);
    window.addEventListener("resize", checkScrollable);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [active]);

  const handleScroll = () => {
    const panel = panelRef.current;
    if (panel) {
      const isAtBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 10;
      setShowScrollHint(!isAtBottom);
    }
  };

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
          background: rgba(0, 0, 0, 0.45);
          z-index: 2;
          pointer-events: none;
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
        }

        /* Scrollable Detail Panel Styling with Wrapper for Indicator */
        .resume-panel-container {
          position: absolute;
          top: 9vh;
          right: 4.5vw;
          width: min(44vw, 680px);
          max-height: 82vh;
          z-index: 12;
          pointer-events: auto;
        }

        .resume-detail-panel {
          width: 100%;
          max-height: 82vh;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(20, 2, 4, 0.96) 0%, rgba(10, 1, 2, 0.97) 100%);
          border-left: 6px solid #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(217, 4, 41, 0.3),
            16px 16px 0 rgba(0, 0, 0, 0.85);
          overflow-y: auto;
        }

        /* Custom Scrollbar for P5 aesthetic */
        .resume-detail-panel::-webkit-scrollbar {
          width: 8px;
        }
        .resume-detail-panel::-webkit-scrollbar-track {
          background: rgba(10, 1, 2, 0.9);
        }
        .resume-detail-panel::-webkit-scrollbar-thumb {
          background: #d90429;
          border-radius: 2px;
        }
        .resume-detail-panel::-webkit-scrollbar-thumb:hover {
          background: #ef233c;
        }

        /* Scroll Down Indicator Badge */
        .scroll-down-indicator {
          position: absolute;
          bottom: 12px;
          right: 28px;
          background: #d90429;
          color: #ffffff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          padding: 4px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          z-index: 15;
          pointer-events: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.6);
          animation: bounceIndicator 1.4s ease-in-out infinite;
        }

        @keyframes bounceIndicator {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
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
          font-size: 38px;
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
          grid-template-columns: 45px 1fr;
          align-items: start;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(20, 2, 4, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(239, 35, 60, 0.25);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(40, 4, 8, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: #ff4d6d;
          padding-top: 2px;
        }
        .resume-detail-content-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 24px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-row-details {
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          line-height: 1.25;
          color: #000000;
          background: #ffffff;
          padding: 6px 12px;
          border-left: 4px solid #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          margin-top: 4px;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #ffffff;
          background: #d90429;
          padding: 5px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          max-width: 250px;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .resume-detail-row-standard {
          display: grid;
          grid-template-columns: 45px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 50px;
          padding: 0 14px;
          background: rgba(20, 2, 4, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(239, 35, 60, 0.25);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row-standard:hover {
          transform: translateX(4px);
          background: rgba(40, 4, 8, 1);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 18px;
          padding: 16px;
          background: rgba(15, 2, 3, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(239, 35, 60, 0.25);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #ff4d6d;
          margin-bottom: 10px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 19px;
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
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
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

        {/* EDUCATION PANEL */}
        {active === 0 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">01</div>
                <div className="resume-detail-top-title">EDUCATION LOG</div>
                <div className="resume-detail-top-progress">7/5</div>
              </div>

              <div className="resume-detail-list">
                {EDUCATION_ROWS.map((row) => (
                  <div className="resume-detail-row-standard" key={row.index}>
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
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}

        {/* SKILLS PANEL */}
        {active === 1 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">02</div>
                <div className="resume-detail-top-title">SKILLS MATRIX</div>
                <div className="resume-detail-top-progress">8/8</div>
              </div>

              <div className="resume-detail-list">
                {SKILLS_ROWS.map((row) => (
                  <div className="resume-detail-row" key={row.index}>
                    <div className="resume-detail-row-index">{row.index}</div>
                    <div className="resume-detail-content-wrap">
                      <div className="resume-detail-row-title">{row.title}</div>
                      <div className="resume-detail-row-details">{row.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}

        {/* PROJECTS PANEL */}
        {active === 2 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">03</div>
                <div className="resume-detail-top-title">FEATURED WORK</div>
                <div className="resume-detail-top-progress">3/3</div>
              </div>

              <div className="resume-detail-list">
                {PROJECTS_ROWS.map((row) => (
                  <div className="resume-detail-row-standard" key={row.index}>
                    <div className="resume-detail-row-index">{row.index}</div>
                    <div className="resume-detail-row-title">{row.title}</div>
                    <div className="resume-detail-status">{row.status}</div>
                  </div>
                ))}
              </div>

              <div className="resume-detail-bottom">
                <div className="resume-detail-bottom-title">DETAILS</div>
                <div className="resume-detail-bullets">
                  <div className="resume-detail-bullet">Built high-performance full-stack web and mobile apps.</div>
                  <div className="resume-detail-bullet">Integrated custom computer vision models with real-time tracking.</div>
                  <div className="resume-detail-bullet">Developed interactive business intelligence dashboards and reporting pipelines.</div>
                </div>
              </div>
            </div>
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}

        {/* EXPERIENCE PANEL */}
        {active === 3 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">04</div>
                <div className="resume-detail-top-title">EXPERIENCE LOG</div>
                <div className="resume-detail-top-progress">2/2</div>
              </div>

              <div className="resume-detail-list">
                {EXPERIENCE_ROWS.map((row) => (
                  <div className="resume-detail-row-standard" key={row.index}>
                    <div className="resume-detail-row-index">{row.index}</div>
                    <div className="resume-detail-row-title">{row.title}</div>
                    <div className="resume-detail-status">{row.status}</div>
                  </div>
                ))}
              </div>

              <div className="resume-detail-bottom">
                <div className="resume-detail-bottom-title">DETAILS</div>
                <div className="resume-detail-bullets">
                  <div className="resume-detail-bullet">Designed and maintained scalable software infrastructure & workflows.</div>
                  <div className="resume-detail-bullet">Executed multimedia campaigns, asset management, and UI design upgrades.</div>
                  <div className="resume-detail-bullet">Collaborated across cross-functional teams to streamline digital solutions.</div>
                </div>
              </div>
            </div>
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}
      </div>
    </div>
  );
}