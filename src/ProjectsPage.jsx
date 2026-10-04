import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/buildings gray4.mp4";

import swineScanVid from "./assets/Swine Scan.mp4";
import kashyaVid from "./assets/Kashya.mp4";
import etaVid from "./assets/ETA.mp4";

const PROJECTS = [
  {
    id: "proj-1",
    badge: "01",
    title: "SWINE SCAN",
    subtitle: "Computer Vision / Machine Learning / IoT & Hardware",
    description: "A smart pig monitoring system for continuous, non-contact health and behavioral analysis using computer vision, environmental sensors, and IoT hardware.",
    contributions: [
      "Software: Annotated 11K frames using Roboflow, trained YOLOv8 for behavior detection, implemented DeepSORT for continuous pig ID tracking, and synced sensor-to-mobile data pipelines via Firebase.",
      "Hardware: Built an IoT-ready CCTV device (Arduino, ESP32-CAM, temperature, humidity, and luminance sensors) and 3D-printed a custom protective hardware casing.",
      "Media: Created the project logo, poster, visual assets, and promotional video."
    ],
    videoSrc: swineScanVid,
    tech: ["YOLOv8", "DeepSORT", "Firebase", "ESP32", "Arduino"],
  },
  {
    id: "proj-2",
    badge: "02",
    title: "KASHYA",
    subtitle: "Mobile App / Gemini API / AI Chatbot",
    description: "An entry for BPI Datawave 2025. A mobile application with an integrated AI chatbot designed to help users set financial goals and assess the achievability of major life spending.",
    contributions: [
      "Developed the mobile application featuring an AI chatbot powered by the Gemini API.",
      "Created the product logo, visual branding assets, and presentation video."
    ],
    videoSrc: kashyaVid,
    tech: ["Mobile", "Gemini API", "Chatbot"],
  },
  {
    id: "proj-3",
    badge: "03",
    title: "ETA: SMART TRAVEL",
    subtitle: "Mobile App / A* Algorithm / OpenStreetMap",
    description: "A smart travel guide application designed to reduce commuter travel times by calculating the most efficient routes using the A* pathfinding algorithm.",
    contributions: [
      "Created the official logo, full branding package, and promotional video.",
      "Assisted in UI/UX design and asset creation for the mobile application interface."
    ],
    videoSrc: etaVid,
    tech: ["A* Algorithm", "OpenStreetMap", "Mobile"],
  },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Stores playback state { currentTime, isPlaying, isMuted } for each project id
  const [videoStates, setVideoStates] = useState({});

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

  // Helper to update current project's video state
  const updateCurrentVideoState = (newState) => {
    setVideoStates((prev) => ({
      ...prev,
      [currentProject.id]: {
        ...(prev[currentProject.id] || { currentTime: 0, isPlaying: false, isMuted: true }),
        ...newState,
      },
    }));
  };

  const currentState = videoStates[currentProject.id] || { currentTime: 0, isPlaying: false, isMuted: true };

  return (
    <div className="projects-screen">
      {/* MP4 Video Background Layer with Overlay Tint */}
      <div className="projects-bg" aria-hidden="true">
        <video
          className="projects-video-bg"
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="p5-video-overlay" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .projects-screen {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #0b0b0b;
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
          background-color: #0b0b0b;
          overflow: hidden;
          pointer-events: none;
        }

        .projects-video-bg {
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

        /* Left Side: Project Navigation List */
        .projects-stack {
          position: relative;
          z-index: 10;
          width: 42vw;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 82vh;
          overflow-y: auto;
          padding-right: 8px;
        }

        .projects-stack::-webkit-scrollbar {
          width: 4px;
        }
        .projects-stack::-webkit-scrollbar-thumb {
          background: #d90429;
        }

        .projects-header-title {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 2px;
          margin-bottom: 6px;
          text-shadow: 0 12px 0 rgba(0,0,0,0.6);
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
          height: 80px;
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
          top: 6px;
          left: -8px;
          width: 42px;
          height: 50px;
          background: #d90429;
          border: 2px solid #ffffff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-6deg);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
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
          font-size: 30px;
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
          font-size: 17px;
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
          max-height: 92vh;
          overflow-y: auto;
          background: linear-gradient(180deg, rgba(18, 2, 4, 0.96) 0%, rgba(8, 1, 2, 0.98) 100%);
          border-left: 6px solid #d90429;
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(217, 4, 41, 0.3), 16px 16px 0 rgba(0,0,0,0.85);
          padding: 24px 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          transform: translateX(30px);
          animation: panelFadeIn 0.5s ease forwards 0.2s;
        }

        .project-display-panel::-webkit-scrollbar {
          width: 4px;
        }
        .project-display-panel::-webkit-scrollbar-thumb {
          background: #d90429;
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
          padding-bottom: 12px;
          margin-bottom: 14px;
        }

        .panel-badge-id {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
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
          font-size: 15px;
          letter-spacing: 1px;
          background: rgba(217, 4, 41, 0.2);
          border: 1px solid #d90429;
          color: #ff8fa3;
          padding: 2px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }

        /* Full Width Video Container & Controls Overlay */
        .panel-video-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000000;
          border: 2px solid rgba(217, 4, 41, 0.5);
          overflow: hidden;
          margin-bottom: 14px;
        }

        .panel-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .video-custom-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
          padding: 16px 12px 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }

        .video-timeline {
          width: 100%;
          accent-color: #d90429;
          cursor: pointer;
          height: 4px;
        }

        .video-controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .video-btn-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .video-control-btn {
          background: #d90429;
          border: none;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 1px;
          padding: 3px 10px;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
          transition: background 0.2s ease;
        }

        .video-control-btn:hover {
          background: #ff4d6d;
        }

        .video-time-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          color: #ccc;
          letter-spacing: 1px;
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
          font-size: 32px;
          color: #ffffff;
          line-height: 1;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .panel-description {
          font-family: 'Anton', sans-serif;
          font-size: 17px;
          line-height: 1.3;
          color: #cfd8dc;
          font-weight: normal;
          margin-bottom: 12px;
        }

        .panel-section-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1.2px;
          color: #ff4d6d;
          border-bottom: 1px dashed rgba(217, 4, 41, 0.3);
          padding-bottom: 2px;
          margin-bottom: 6px;
          margin-top: 16px;
        }

        .panel-contributions-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .panel-contribution-item {
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          line-height: 1.3;
          color: #e0e0e0;
          position: relative;
          padding-left: 14px;
        }

        .panel-contribution-item::before {
          content: '■';
          position: absolute;
          left: 0;
          color: #d90429;
          font-size: 10px;
          top: 1px;
        }

        .panel-footer-hint {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
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

      {/* Right Display Panel with Full-Sized Interactive Video */}
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

          {/* Full-Sized Video Container with Persistent State & Fullscreen */}
          <InteractiveVideoPlayer
            videoSrc={currentProject.videoSrc}
            state={currentState}
            onUpdateState={updateCurrentVideoState}
          />

          <div className="panel-title">{currentProject.title}</div>
          <div className="panel-description">{currentProject.description}</div>

          <div className="panel-section-heading">CONTRIBUTIONS</div>
          <ul className="panel-contributions-list">
            {currentProject.contributions.map((item, idx) => (
              <li key={idx} className="panel-contribution-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel-footer-hint">
          <span>USE ↑↓ TO NAVIGATE PROJECTS</span>
          <span>PRESS ← OR ESC TO RETURN</span>
        </div>
      </div>
    </div>
  );
}

// Sub-component handling video playback, memory persistence, scrubbing, mute, and fullscreen
function InteractiveVideoPlayer({ videoSrc, state, onUpdateState }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [duration, setDuration] = useState(0);

  // Sync state changes with the DOM video element whenever it mounts or switches
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = state.currentTime || 0;
    videoRef.current.muted = state.isMuted ?? true;

    if (state.isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [videoSrc]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (state.isPlaying) {
      videoRef.current.pause();
      onUpdateState({ isPlaying: false });
    } else {
      videoRef.current.play().catch(() => {});
      onUpdateState({ isPlaying: true });
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !state.isMuted;
    videoRef.current.muted = nextMuted;
    onUpdateState({ isMuted: nextMuted });
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    onUpdateState({ currentTime: videoRef.current.currentTime });
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    // Ensure initial time sync after metadata loads
    videoRef.current.currentTime = state.currentTime || 0;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = newTime;
    onUpdateState({ currentTime: newTime });
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remain = Math.floor(secs % 60);
    return `${mins}:${remain < 10 ? "0" : ""}${remain}`;
  };

  return (
    <div className="panel-video-container" ref={containerRef}>
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            className="panel-video"
            src={videoSrc}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => onUpdateState({ isPlaying: false, currentTime: 0 })}
          />
          <div className="video-custom-controls">
            <input
              type="range"
              className="video-timeline"
              min={0}
              max={duration || 0}
              value={state.currentTime || 0}
              onChange={handleSeek}
            />
            <div className="video-controls-row">
              <div className="video-btn-group">
                <button className="video-control-btn" onClick={handleTogglePlay}>
                  {state.isPlaying ? "PAUSE" : "PLAY"}
                </button>
                <button className="video-control-btn" onClick={handleToggleMute}>
                  {state.isMuted ? "UNMUTE" : "MUTE"}
                </button>
                <button className="video-control-btn" onClick={handleFullscreen}>
                  FULLSCREEN
                </button>
              </div>
              <div className="video-time-display">
                {formatTime(state.currentTime || 0)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="panel-fallback-video">NO VIDEO DEMO AVAILABLE</div>
      )}
    </div>
  );
}