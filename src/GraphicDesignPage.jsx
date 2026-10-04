import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/city red 2.mp4"; // Adjust path if necessary

const GRAPHIC_PROJECTS = [
  {
    id: "gd-1",
    badge: "01",
    title: "CYBERPUNK BRAND IDENTITY",
    subtitle: "Logo Design / Brand Guidelines / Vector Art",
    description: "Complete visual identity system designed for an indie synthwave music label, featuring custom typography, color theory standards, and promotional collateral.",
    mediaType: "image", // "image" or "video"
    mediaSrc: "/images/graphic1.png", // Replace with your image/video path
    tools: ["Illustrator", "Photoshop", "InDesign"],
  },
  {
    id: "gd-2",
    badge: "02",
    title: "NEON MOTION POSTER",
    subtitle: "Motion Graphics / VFX / Typography",
    description: "An animated promotional poster loop created for a virtual techno concert event, emphasizing heavy chromatic aberration and glitch effects.",
    mediaType: "video",
    mediaSrc: "/videos/graphic2.mp4",
    tools: ["After Effects", "Premiere", "Cinema 4D"],
  },
  {
    id: "gd-3",
    badge: "03",
    title: "RETRO ARCADE PACKAGING",
    subtitle: "Product Packaging / 3D Mockup / Illustration",
    description: "Physical box design and merchandise layout inspired by 90s Japanese arcade cabinets and collectible game cartridges.",
    mediaType: "image",
    mediaSrc: "/images/graphic3.png",
    tools: ["Photoshop", "Blender", "Illustrator"],
  },
  {
    id: "gd-4",
    badge: "04",
    title: "EDITORIAL MAGAZINE SPREAD",
    subtitle: "Layout Design / Typography / Editorial",
    description: "A multi-page magazine layout exploring brutalist grid structures, high-contrast typography, and asymmetrical image placements.",
    mediaType: "image",
    mediaSrc: "/images/graphic4.png",
    tools: ["InDesign", "Photoshop"],
  },
];

export default function GraphicDesignPage() {
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
      if (e.key === "ArrowDown") setActive((i) => Math.min(GRAPHIC_PROJECTS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const currentProject = GRAPHIC_PROJECTS[active];

  return (
    <div className="graphic-screen">
      {/* MP4 Video Background Layer with P5 Overlay Tint */}
      <div className="graphic-bg" aria-hidden="true">
        <video
          className="graphic-video-bg"
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

        .graphic-screen {
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

        .graphic-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-color: #0b0b0b;
          overflow: hidden;
          pointer-events: none;
        }

        .graphic-video-bg {
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
          background: rgba(0, 0, 0, 0.55);
          z-index: 2;
          pointer-events: none;
        }

        /* Left Side: Design Navigation List */
        .graphic-stack {
          position: relative;
          z-index: 10;
          width: 42vw;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .graphic-header-title {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 2px;
          margin-bottom: 10px;
          text-shadow: 0 4px 0 rgba(0,0,0,0.6);
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .graphic-header-title.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .graphic-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          pointer-events: all;
        }
        .graphic-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .graphic-card {
          position: relative;
          height: 94px;
          background: #111111;
          border-left: 6px solid #ff2a2a;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 0 rgba(0, 0, 0, 0.8);
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: center;
          padding-left: 55px;
          padding-right: 20px;
        }

        .graphic-card-wrap.active .graphic-card {
          background: #ffffff;
          box-shadow: 8px 6px 0 #ff2a2a;
          transform: translateX(8px);
        }

        .graphic-badge {
          position: absolute;
          top: 8px;
          left: -8px;
          width: 46px;
          height: 58px;
          background: #ff2a2a;
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
        .graphic-card-wrap.active .graphic-badge {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        .graphic-card-info {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .graphic-title-text {
          font-family: 'Anton', sans-serif;
          font-size: 34px;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          transition: color 0.2s ease;
        }
        .graphic-card-wrap.active .graphic-title-text {
          color: #000000;
        }

        .graphic-subtitle-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: 1.5px;
          color: #ff6884;
          transition: color 0.2s ease;
          margin-top: 2px;
        }
        .graphic-card-wrap.active .graphic-subtitle-text {
          color: #333333;
        }

        /* Right Side: Media Showcase Panel */
        .graphic-display-panel {
          position: relative;
          z-index: 10;
          width: 48vw;
          min-height: 76vh;
          background: linear-gradient(180deg, rgba(18, 2, 4, 0.96) 0%, rgba(8, 1, 2, 0.98) 100%);
          border-left: 6px solid #ff2a2a;
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255, 42, 42, 0.3), 16px 16px 0 rgba(0,0,0,0.85);
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
          border-bottom: 2px solid rgba(255, 42, 42, 0.4);
          padding-bottom: 14px;
          margin-bottom: 18px;
        }

        .panel-badge-id {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          color: #ff2a2a;
          background: #ffffff;
          padding: 2px 14px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .panel-tools-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tool-pill {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1px;
          background: rgba(255, 42, 42, 0.2);
          border: 1px solid #ff2a2a;
          color: #ff99ab;
          padding: 2px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }

        .panel-media-container {
          position: relative;
          width: 100%;
          height: 250px;
          background: #000000;
          border: 2px solid rgba(255, 42, 42, 0.5);
          overflow: hidden;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panel-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .panel-media-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .panel-media-fallback {
          color: #666;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          text-align: center;
          padding: 20px;
        }

        .panel-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          color: #ffffff;
          line-height: 1;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .panel-description {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
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
      <div className="graphic-stack">
        <div className={`graphic-header-title ${mounted ? "mounted" : ""}`}>
          GRAPHIC DESIGN
        </div>
        {GRAPHIC_PROJECTS.map((proj, index) => (
          <div
            key={proj.id}
            className={`graphic-card-wrap ${active === index ? "active" : ""} ${mounted ? "mounted" : ""}`}
            style={{ transitionDelay: `${index * 55}ms` }}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <div className="graphic-card">
              <div className="graphic-badge">{proj.badge}</div>
              <div className="graphic-card-info">
                <div className="graphic-title-text">{proj.title}</div>
                <div className="graphic-subtitle-text">{proj.subtitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Display Panel with Media Showcase */}
      <div className="graphic-display-panel" key={currentProject.id}>
        <div>
          <div className="panel-top-bar">
            <div className="panel-badge-id">{currentProject.badge}</div>
            <div className="panel-tools-tags">
              {currentProject.tools.map((tool, idx) => (
                <span key={idx} className="tool-pill">{tool}</span>
              ))}
            </div>
          </div>

          {/* Media Showcase Section (Image or Video) */}
          <div className="panel-media-container">
            {currentProject.mediaType === "video" ? (
              <video
                className="panel-media-video"
                src={currentProject.mediaSrc}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : currentProject.mediaType === "image" && currentProject.mediaSrc ? (
              <img
                className="panel-media-img"
                src={currentProject.mediaSrc}
                alt={currentProject.title}
              />
            ) : (
              <div className="panel-media-fallback">NO MEDIA PREVIEW AVAILABLE</div>
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