import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/buildings gray2.mp4";

const PROJECTS = [
  {
    id: "proj-1",
    badge: "01",
    title: "DISTRIBUTED CACHE SYSTEM",
    subtitle: "Go / Raft Consensus / Networking",
    description: "A fault-tolerant distributed in-memory key-value store implementing the Raft consensus algorithm for leader election and log replication across multi-node clusters.",
    videoSrc: "/videos/project1.mp4",
    tech: ["Go", "gRPC", "Raft", "Docker"],
  },
  {
    id: "proj-2",
    badge: "02",
    title: "AI COMPILER OPTIMIZER",
    subtitle: "Python / LLVM / Machine Learning",
    description: "An optimization pass framework utilizing reinforcement learning to predict optimal loop unrolling and register allocation strategies for embedded systems.",
    videoSrc: "/videos/project2.mp4",
    tech: ["Python", "LLVM", "PyTorch", "C++"],
  },
  {
    id: "proj-3",
    badge: "03",
    title: "REAL-TIME RAY TRACER",
    subtitle: "C++ / Vulkan / Graphics",
    description: "A custom real-time physically based rendering (PBR) engine supporting bounding volume hierarchies (BVH), reflections, and soft shadows from scratch.",
    videoSrc: "/videos/project3.mp4",
    tech: ["C++", "Vulkan", "GLSL", "Mathematics"],
  },
  {
    id: "proj-4",
    badge: "04",
    title: "SECURE ENCLAVE DB",
    subtitle: "Rust / Intel SGX / Cryptography",
    description: "A privacy-preserving database engine that executes encrypted SQL queries inside isolated hardware enclaves to prevent memory inspection attacks.",
    videoSrc: "/videos/project4.mp4",
    tech: ["Rust", "Intel SGX", "SQL", "Crypto"],
  },
];

export default function ProjectsPage() {
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
      if (e.key === "ArrowDown") setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const currentProject = PROJECTS[active];

  return (
    <div className="projects-screen">
      {/* MP4 Video Background Layer */}
      <div className="projects-bg" aria-hidden="true">
        <video
          className="projects-video-bg"
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="projects-vignette"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .projects-screen {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #080808;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5vh 4vw;
          box-sizing: border-box;
        }

        .projects-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-color: #050505;
          overflow: hidden;
          pointer-events: none;
        }

        /* Fullscreen MP4 Video Background Styling */
        .projects-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .projects-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.85) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Left Side: Project Navigation List */
        .projects-stack {
          position: relative;
          z-index: 10;
          width: 42vw;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .projects-header-title {
          font-family: 'Anton', sans-serif;
          font-size: 80px;
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 2px;
          margin-bottom: 10px;
          text-shadow: 0 4px 0 rgba(0,0,0,0.6);
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .projects-header-title.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .project-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          pointer-events: all;
        }
        .project-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .project-card {
          position: relative;
          height: 94px;
          background: #111111;
          border-left: 6px solid #d90429;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 0 rgba(0, 0, 0, 0.8);
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: center;
          padding-left: 55px;
          padding-right: 20px;
        }

        .project-card-wrap.active .project-card {
          background: #ffffff;
          box-shadow: 8px 6px 0 #d90429;
          transform: translateX(8px);
        }

        .project-badge {
          position: absolute;
          top: 8px;
          left: -8px;
          width: 46px;
          height: 58px;
          background: #d90429;
          border: 2px solid #ffffff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-6deg);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: #ffffff;
          box-shadow: 0 3px 0 rgba(0,0,0,0.3);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .project-card-wrap.active .project-badge {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        .project-card-info {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .project-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          transition: color 0.2s ease;
        }
        .project-card-wrap.active .project-title {
          color: #000000;
        }

        .project-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1.5px;
          color: #ff4d6d;
          transition: color 0.2s ease;
          margin-top: 2px;
        }
        .project-card-wrap.active .project-subtitle {
          color: #333333;
        }

        /* Right Side: Interactive Showcase Panel & Video Preview */
        .project-display-panel {
          position: relative;
          z-index: 10;
          width: 48vw;
          min-height: 76vh;
          background: linear-gradient(180deg, rgba(18, 2, 4, 0.96) 0%, rgba(8, 1, 2, 0.98) 100%);
          border-left: 6px solid #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(217, 4, 41, 0.3), 16px 16px 0 rgba(0,0,0,0.85);
          padding: 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          transform: translateX(30px);
          animation: panelFadeIn 0.5s ease forwards 0.2s;
        }

        @keyframes panelFadeIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .panel-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(217, 4, 41, 0.4);
          padding-bottom: 14px;
          margin-bottom: 18px;
        }

        .panel-badge-id {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          color: #d90429;
          background: #ffffff;
          padding: 2px 14px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .panel-tech-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tech-pill {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1px;
          background: rgba(217, 4, 41, 0.2);
          border: 1px solid #d90429;
          color: #ff8fa3;
          padding: 2px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }

        .panel-video-container {
          position: relative;
          width: 100%;
          height: 240px;
          background: #000000;
          border: 2px solid rgba(217, 4, 41, 0.5);
          overflow: hidden;
          margin-bottom: 18px;
        }

        .panel-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .panel-fallback-video {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(45deg, #111, #222);
          color: #777;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
        }

        .panel-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          color: #ffffff;
          line-height: 1;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .panel-description {
          font-family: 'Anton', sans-serif;
          font-size: 19px;
          line-height: 1.3;
          color: #cfd8dc;
          font-weight: normal;
        }

        .panel-footer-hint {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
      `}</style>

      {/* Left Menu Stack */}
      <div className="projects-stack">
        <div className={`projects-header-title ${mounted ? "mounted" : ""}`}>
          PROJECTS
        </div>
        {PROJECTS.map((proj, index) => (
          <div
            key={proj.id}
            className={`project-card-wrap ${active === index ? "active" : ""} ${mounted ? "mounted" : ""}`}
            style={{ transitionDelay: `${index * 55}ms` }}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <div className="project-card">
              <div className="project-badge">{proj.badge}</div>
              <div className="project-card-info">
                <div className="project-title">{proj.title}</div>
                <div className="project-subtitle">{proj.subtitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Display Panel with Video & Description */}
      <div className="project-display-panel" key={currentProject.id}>
        <div>
          <div className="panel-top-bar">
            <div className="panel-badge-id">{currentProject.badge}</div>
            <div className="panel-tech-tags">
              {currentProject.tech.map((t, idx) => (
                <span key={idx} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>

          {/* Video Preview Section */}
          <div className="panel-video-container">
            {currentProject.videoSrc ? (
              <video
                className="panel-video"
                src={currentProject.videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div className="panel-fallback-video">NO VIDEO DEMO AVAILABLE</div>
            )}
          </div>

          <div className="panel-title">{currentProject.title}</div>
          <div className="panel-description">{currentProject.description}</div>
        </div>

        <div className="panel-footer-hint">
          <span>USE ↑↓ TO NAVIGATE PROJECTS</span>
          <span>PRESS ← OR ESC TO RETURN</span>
        </div>
      </div>
    </div>
  );
}