import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import myVideoFile from "./assets/buildings red3.mp4";

import pmiCertImg from "./assets/PMI Project Management Ready_page-0001 small.jpg";
import pythonCertImg from "./assets/Python_page-0001 small.jpg";
import ccnaCertImg from "./assets/CCNA-_Introduction_to_Networks_certificate_mljsumague-gmail-com_62bee3a2-f4b4-41f4-815f-326ce8dee2c1_page-0001 small.jpg";
import fccCertImg from "./assets/Responsive Web Design small 2.jpg";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "University / Coursework", rank: 1 },
  { id: "ii", badge: "II", title: "EXPERIENCE", subtitle: "Internships / Roles", rank: 2 },
  { id: "iii", badge: "III", title: "SKILLS", subtitle: "Frontend / Design / UI", rank: 3 },
  { id: "iv", badge: "IV", title: "CERTIFICATIONS", subtitle: "Industry Credentials", rank: 4 },
  { id: "v", badge: "V", title: "ACHIEVEMENTS", subtitle: "Competitions & Awards", rank: 5 },
];

const EDUCATION_DETAILS = {
  university: "FEU Institute of Technology",
  degree: "BS Computer Science with Specialization in Data Science",
  leadership: [
    {
      title: "CS EXPO 2025 - Finance Committee (Sep. 2025 - Dec 2025)",
      bullets: [
        "Verified payments against registration records and resolved discrepancies",
        "Maintained financial records and monitored event transactions"
      ]
    },
    {
      title: "ACM Student Chapter (FEU Tech) - Finance Junior Officer (Sept 2022 - Aug 2024)",
      bullets: [
        "Monitored and documented financial transactions for accurate budget tracking",
        "Assisted in managing the organization's finances, including maintaining financial records"
      ]
    }
  ]
};

const EXPERIENCE_ROWS = [
  { 
    index: "01", 
    title: "IT Business Analyst Intern", 
    subtitle: "PurpleBug, Inc. (Dec 2025 - Jul 2026)",
    details: [
      "Developed Power BI and Looker Studio dashboards for KPI reporting",
      "Managed website migrations, content audits, and front-end optimization",
      "Automated workflows and reports using Python, Excel, Apps Script, and Power Automate",
      "Built AI-powered chatbots and LLM knowledge bases with conversational storyflows on Smicos",
      "Processed OCR/text extraction data and performed data cleaning for AI-ready datasets"
    ]
  }
];

const SKILLS_ROWS = [
  { index: "01", title: "Programming Languages", details: "Python, Java, JavaScript, SQL, HTML/CSS, PHP, C/C++" },
  { index: "02", title: "Mobile App Development", details: "Flutter, Dart, Android Studio, Firebase, Mobile UI Development" },
  { index: "03", title: "Developer Tools & Platforms", details: "VS Code, Jupyter Notebook, Google Colab, Power BI, Looker Studio, Roboflow, Figma, Git/GitHub" },
  { index: "04", title: "Frameworks & Libraries", details: "YOLOv8, TensorFlow, Keras, PyTorch, Pandas, NumPy, Matplotlib, Scikit-learn, OpenCV, ByteTrack" },
  { index: "05", title: "Data Analytics & BI", details: "Microsoft Power BI, Google Looker Studio, Data Visualization, KPI Reporting" },
  { index: "06", title: "AI & Automation", details: "Conversational AI, Workflow Automation, Machine Learning, Computer Vision, Microsoft Power Automate" },
  { index: "07", title: "Web & Digital Solutions", details: "Website Migration, Front-End Optimization, Content Management, User Experience Enhancement" },
  { index: "08", title: "Graphic Design & Multimedia", details: "Adobe Photoshop, Premiere Pro, After Effects, Canva, Adobe Illustrator, Ibis Paint, Mixed Media, Content Creation" },
];

const CERTIFICATIONS_ROWS = [
  { 
    index: "01", 
    title: "PMI Project Management Ready", 
    status: "2025", 
    image: pmiCertImg 
  },
  { 
    index: "02", 
    title: "IT Specialist Python Certification", 
    status: "2024", 
    image: pythonCertImg
  },
  { 
    index: "03", 
    title: "CCNA: Introduction to Networks", 
    status: "2024", 
    image: ccnaCertImg
  },
  { 
    index: "04", 
    title: "FreeCodeCamp: Responsive Web Design", 
    status: "2021", 
    image: fccCertImg
  },
];

const ACHIEVEMENTS_ROWS = [
  { 
    index: "01", 
    title: "Sustainable Food Asia 2026 – Malaysia", 
    details: "Top 4 Finalist among 30 teams across Asia"
  },
  { 
    index: "02", 
    title: "EMC Global Summit 2026 – Japan", 
    details: "Awarded Global Award and recognized among the Top 10 International Startup Finalists"
  },
  { 
    index: "03", 
    title: "CS Expo 2025 - FEU Institute of Technology", 
    details: "Best Thesis for Agricultural Category and 3rd Overall Best Thesis"
  },
  { 
    index: "04", 
    title: "Startup QC Student Competition 2025", 
    details: "2nd Runner-Up, placing among the top 4 teams out of 100+ participating teams"
  },
  { 
    index: "05", 
    title: "Philippine Startup Challenge 9 (2024)", 
    details: "National 1st Runner-Up and Regional Champion, selected from 783 teams representing 213 schools"
  }
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  
  const [expandedCert, setExpandedCert] = useState(null);
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

  const checkScrollable = () => {
    const panel = panelRef.current;
    if (panel) {
      const hasOverflow = panel.scrollHeight > panel.clientHeight;
      const isAtBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 10;
      setShowScrollHint(hasOverflow && !isAtBottom);
    }
  };

  useEffect(() => {
    const t = setTimeout(checkScrollable, 50);
    window.addEventListener("resize", checkScrollable);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [active, expandedCert]);

  const handleScroll = () => {
    const panel = panelRef.current;
    if (panel) {
      const isAtBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 10;
      setShowScrollHint(!isAtBottom);
    }
  };

  const toggleCertImage = (index) => {
    setExpandedCert(expandedCert === index ? null : index);
  };

  return (
    <div id="menu-screen" className="p5-bg-container">
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
          top: 6vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
          transform: scale(0.85);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 82px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 4px 12px;
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
          height: 100px;
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
          padding: 12px 22px 12px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 8px;
          left: -10px;
          width: 52px;
          height: 62px;
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
          font-size: 32px;
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
          font-size: 48px;
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
          font-size: 25px;
          letter-spacing: 2px;
          color: #ff4d6d;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 60px;
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
          bottom: 10px;
          height: 30px;
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
          font-size: 24px;
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
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-row-details {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 23.5px;
          font-weight: bold;
          line-height: 1.25;
          letter-spacing: 1px;
          color: #000000;
          background: #f5f3f3;
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
        .cert-action-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          background: #d90429;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          transition: background 0.2s ease;
          pointer-events: auto;
        }
        .cert-action-btn:hover {
          background: #ef233c;
        }
        .cert-image-container {
          margin-top: 10px;
          padding: 8px;
          background: #ffffff;
          border-left: 4px solid #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
        }
        .cert-image-preview {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          border-radius: 2px;
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
                    <div className="resume-rank-label">INFO</div>
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
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">01</div>
                <div className="resume-detail-top-title">EDUCATION</div>
                <div className="resume-detail-top-progress">2/2</div>
              </div>

              <div className="resume-detail-list">
                <div className="resume-detail-row">
                  <div className="resume-detail-row-index">01</div>
                  <div className="resume-detail-content-wrap">
                    <div className="resume-detail-row-title">{EDUCATION_DETAILS.university}</div>
                    <div className="resume-detail-row-details">{EDUCATION_DETAILS.degree}</div>
                  </div>
                </div>

                <div className="resume-detail-row" style={{ marginTop: "12px" }}>
                  <div className="resume-detail-row-index">02</div>
                  <div className="resume-detail-content-wrap">
                    <div className="resume-detail-row-title">LEADERSHIP</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                      {EDUCATION_DETAILS.leadership.map((lead, lIdx) => (
                        <div key={lIdx} style={{ background: "#ffffff", padding: "8px 12px", borderLeft: "4px solid #d90429", clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)" }}>
                          <div style={{ fontFamily: "'Anton', sans-serif", fontSize: "19px", color: "#000000", marginBottom: "6px" }}>
                            {lead.title}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {lead.bullets.map((bText, bIdx) => (
                              <div 
                                key={bIdx} 
                                style={{ 
                                  fontFamily: "'Bebas Neue', sans-serif", 
                                  fontSize: "18px", 
                                  color: "#000000", 
                                  letterSpacing: "0.5px", 
                                  lineHeight: "1.2", 
                                  background: "#eae6e6", 
                                  padding: "6px 10px", 
                                  borderLeft: "3px solid #d90429",
                                  clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"
                                }}
                              >
                                {bText}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}

        {active === 1 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">02</div>
                <div className="resume-detail-top-title">EXPERIENCE LOG</div>
                <div className="resume-detail-top-progress">1/1</div>
              </div>

              <div className="resume-detail-list">
                {EXPERIENCE_ROWS.map((row) => (
                  <div className="resume-detail-row" key={row.index}>
                    <div className="resume-detail-row-index">{row.index}</div>
                    <div className="resume-detail-content-wrap">
                      <div className="resume-detail-row-title">{row.title}</div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#ff4d6d", letterSpacing: "1px", marginBottom: "6px" }}>
                        {row.subtitle}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "2px" }}>
                        {row.details.map((detailText, dIdx) => (
                          <div 
                            key={dIdx} 
                            style={{ 
                              fontFamily: "'Bebas Neue', sans-serif", 
                              fontSize: "21px", 
                              fontWeight: "bold",
                              letterSpacing: "0.8px", 
                              lineHeight: "1.2", 
                              color: "#000000", 
                              background: "#f5f3f3", 
                              padding: "8px 12px", 
                              borderLeft: "4px solid #d90429", 
                              clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)" 
                            }}
                          >
                            {detailText}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}

        {active === 2 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">03</div>
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

        {active === 3 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">04</div>
                <div className="resume-detail-top-title">CREDENTIALS</div>
                <div className="resume-detail-top-progress">4/4</div>
              </div>

              <div className="resume-detail-list">
                {CERTIFICATIONS_ROWS.map((row) => {
                  const isExpanded = expandedCert === row.index;
                  return (
                    <div key={row.index} style={{ marginBottom: "10px" }}>
                      <div className="resume-detail-row-standard">
                        <div className="resume-detail-row-index">{row.index}</div>
                        <div className="resume-detail-row-title">{row.title}</div>
                        <button 
                          className="cert-action-btn"
                          onClick={() => toggleCertImage(row.index)}
                        >
                          {isExpanded ? "HIDE CERTIFICATE" : "SEE CERTIFICATE"}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="cert-image-container">
                          <img 
                            src={row.image} 
                            alt={row.title} 
                            className="cert-image-preview" 
                            onLoad={checkScrollable}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {showScrollHint && <div className="scroll-down-indicator">▼ SCROLL DOWN</div>}
          </div>
        )}

        {active === 4 && (
          <div className="resume-panel-container">
            <div className="resume-detail-panel" ref={panelRef} onScroll={handleScroll}>
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">05</div>
                <div className="resume-detail-top-title">ACHIEVEMENTS</div>
                <div className="resume-detail-top-progress">5/5</div>
              </div>

              <div className="resume-detail-list">
                {ACHIEVEMENTS_ROWS.map((row) => (
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
      </div>
    </div>
  );
}