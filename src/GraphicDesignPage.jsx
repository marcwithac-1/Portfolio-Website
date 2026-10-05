import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/city red 2.mp4"; // Adjust path if necessary
import swineScanImg from "./assets/Swine Scan Poster.jpg";
import southSideImg from "./assets/South Side Ballers League Poster.jpg";
import ryujinImg from "./assets/Ryujin Tunnel Vision Poster.jpg";
import winterImg from "./assets/Aespa Winter Lemonade Poster.jpg";
import giselleImg from "./assets/Aespa Giselle Poster.jpg";
import chisaImg from "./assets/XG Chisa Poster.png";
import laufeyImg from "./assets/Laufey Slow Down.jpg";
import codexImg from "./assets/codex poster.jpg";
import chimacImg from "./assets/Chimac Solutions_Poster.jpg";
import egamesImg from "./assets/egames poster.jpg";
import hightideImg from "./assets/high tide.jpg";
import csnightVid from "./assets/CS Night Edit.mp4";
import swinescanVid from "./assets/Swine Scan PSC Pitch Deck.mp4";
import salayliwaVid from "./assets/Salayliwa.mp4";
import codexVid from "./assets/CODEX Infomercial - Design Thinking Competition - Terr (720p).mp4";
import newjeansVid from "./assets/newjeans just a dream.mp4";
import fragileVid from "./assets/Fragile.mp4";
import ssbawardsVid from "./assets/South Side Ballers Awards.mp4";
import day1hypeVid from "./assets/South Side Ballers League Day 1 Hype Video.mp4";
import day2hypeVid from "./assets/South Side Ballers League Day 2 Hype Video.mp4";
import day1highlightsVid from "./assets/South Side Ballers League Day 1 Highlights.mp4";
import hightideVid from "./assets/High Tide - Valorant Montage Edit.mp4";

const GRAPHIC_PROJECTS = [
  {
    id: "gd-1",
    badge: "01",
    title: "SWINE SCAN - CS EXPO POSTER",
    mediaType: "image",
    mediaSrc: swineScanImg,
  },
  {
    id: "gd-2",
    badge: "02",
    title: "SOUTH SIDE BALLERS LEAGUE POSTER",
    mediaType: "image",
    mediaSrc: southSideImg,
  },
  {
    id: "gd-3",
    badge: "03",
    title: "RETRO ARCADE PACKAGING",
    mediaType: "image",
    mediaSrc: "/images/graphic3.png",
  },
  {
    id: "gd-4",
    badge: "04",
    title: "EDITORIAL MAGAZINE SPREAD",
    mediaType: "image",
    mediaSrc: "/images/graphic4.png",
  },
];

export default function GraphicDesignPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // For Lightbox Modal

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") {
        if (selectedItem) {
          setSelectedItem(null); // Close modal if open
        } else {
          navigate(-1); // Return back
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, selectedItem]);

  const imageProjects = GRAPHIC_PROJECTS.filter((p) => p.mediaType === "image");
  const videoProjects = GRAPHIC_PROJECTS.filter((p) => p.mediaType === "video");

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
          overflow-y: auto;
          background-color: #0b0b0b;
          padding: 5vh 4vw;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .graphic-screen::-webkit-scrollbar {
          width: 6px;
        }
        .graphic-screen::-webkit-scrollbar-thumb {
          background: #ff2a2a;
        }

        .graphic-bg {
          position: fixed;
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
          background: rgba(0, 0, 0, 0.65);
          z-index: 2;
          pointer-events: none;
        }

        /* Header Section */
        .graphic-header-container {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 3px solid #ff2a2a;
          padding-bottom: 15px;
        }

        .graphic-header-title {
          font-family: 'Anton', sans-serif;
          font-size: 64px;
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 2px;
          text-shadow: 0 6px 0 rgba(0,0,0,0.8);
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .graphic-header-title.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .graphic-back-hint {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 1.5px;
        }

        /* Gallery Sections */
        .gallery-section {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-title {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          color: #ff2a2a;
          letter-spacing: 1.5px;
          text-shadow: 0 3px 0 rgba(0,0,0,0.8);
          border-left: 5px solid #ff2a2a;
          padding-left: 12px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* Tile Card Styling */
        .gallery-tile {
          position: relative;
          background: #111111;
          border: 2px solid rgba(255, 42, 42, 0.3);
          clip-path: polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%);
          box-shadow: 0 8px 0 rgba(0, 0, 0, 0.8);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .gallery-tile:hover {
          transform: translateY(-6px);
          border-color: #ff2a2a;
          box-shadow: 6px 12px 0 rgba(255, 42, 42, 0.4);
        }

        .tile-media-box {
          position: relative;
          width: 100%;
          height: 200px;
          background: #000;
          overflow: hidden;
        }

        .tile-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-tile:hover .tile-media {
          transform: scale(1.05);
        }

        .tile-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ff2a2a;
          color: #ffffff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          padding: 1px 10px;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          box-shadow: 0 2px 0 rgba(0,0,0,0.5);
        }

        .tile-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, rgba(18, 2, 4, 0.95) 0%, rgba(10, 1, 2, 0.98) 100%);
          flex-grow: 1;
          justify-content: center;
        }

        .tile-title {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: 1px;
        }

        /* Lightbox Modal Overlay */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4vw;
          animation: fadeIn 0.2s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content {
          position: relative;
          background: #110204;
          border: 3px solid #ff2a2a;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          box-shadow: 12px 12px 0 rgba(255, 42, 42, 0.3);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .lightbox-media-container {
          width: 100%;
          max-height: 65vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(255, 42, 42, 0.4);
        }

        .lightbox-media {
          max-width: 100%;
          max-height: 65vh;
          object-fit: contain;
        }

        .lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(255, 42, 42, 0.3);
          padding-bottom: 10px;
        }

        .lightbox-title {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          color: #ffffff;
          letter-spacing: 1px;
        }

        .lightbox-close-btn {
          background: #ff2a2a;
          border: none;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          padding: 4px 14px;
          cursor: pointer;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          transition: background 0.2s;
        }

        .lightbox-close-btn:hover {
          background: #ff526b;
        }
      `}</style>

      {/* Header */}
      <div className="graphic-header-container">
        <div className={`graphic-header-title ${mounted ? "mounted" : ""}`}>
          GRAPHIC DESIGN & MEDIA
        </div>
        <div className="graphic-back-hint"></div>
      </div>

      {/* SECTION 1: IMAGES */}
      <div className="gallery-section">
        <div className="section-title">IMAGES & BRANDING</div>
        <div className="gallery-grid">
          {imageProjects.map((proj) => (
            <div
              key={proj.id}
              className="gallery-tile"
              onClick={() => setSelectedItem(proj)}
            >
              <div className="tile-media-box">
                <div className="tile-badge">{proj.badge}</div>
                {proj.mediaSrc ? (
                  <img src={proj.mediaSrc} alt={proj.title} className="tile-media" />
                ) : (
                  <div className="panel-media-fallback">NO IMAGE</div>
                )}
              </div>
              <div className="tile-content">
                <div className="tile-title">{proj.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: VIDEOS */}
      <div className="gallery-section">
        <div className="section-title">VIDEOS & MOTION GRAPHICS</div>
        <div className="gallery-grid">
          {videoProjects.map((proj) => (
            <div
              key={proj.id}
              className="gallery-tile"
              onClick={() => setSelectedItem(proj)}
            >
              <div className="tile-media-box">
                <div className="tile-badge">{proj.badge}</div>
                {proj.mediaSrc ? (
                  <video src={proj.mediaSrc} className="tile-media" muted playsInline />
                ) : (
                  <div className="panel-media-fallback">NO VIDEO</div>
                )}
              </div>
              <div className="tile-content">
                <div className="tile-title">{proj.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR DETAILED VIEW */}
      {selectedItem && (
        <div className="lightbox-overlay" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div className="lightbox-title">{selectedItem.title}</div>
              <button className="lightbox-close-btn" onClick={() => setSelectedItem(null)}>
                CLOSE [ESC]
              </button>
            </div>

            <div className="lightbox-media-container">
              {selectedItem.mediaType === "video" ? (
                <video
                  src={selectedItem.mediaSrc}
                  className="lightbox-media"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={selectedItem.mediaSrc}
                  alt={selectedItem.title}
                  className="lightbox-media"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}