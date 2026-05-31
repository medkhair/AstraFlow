import { useState, useEffect } from "react";
import { channels, categories } from "../data/data";

export function Player({ channel, favorites, toggleFavorite, onBack }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isFav = favorites.includes(channel.id);

  const category = categories.find((c) => c.id === channel.category_id);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-hide overlay after 4 seconds of inactivity
  useEffect(() => {
    if (!showOverlay) return;
    const timeout = setTimeout(() => setShowOverlay(false), 4000);
    return () => clearTimeout(timeout);
  }, [showOverlay, channel.id]);

  function handleScreenClick() {
    setShowOverlay((v) => !v);
  }

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Simulated progress: calculate progress based on start/end times
  function getProgress() {
    try {
      const now = currentTime;
      const [sh, sm] = channel.start.split(":").map(Number);
      const [eh, em] = channel.end.split(":").map(Number);
      const startMins = sh * 60 + sm;
      const endMins = eh * 60 + em;
      const nowMins = now.getHours() * 60 + now.getMinutes();
      const total = endMins - startMins;
      const elapsed = nowMins - startMins;
      if (total <= 0) return 50;
      return Math.min(100, Math.max(0, (elapsed / total) * 100));
    } catch {
      return 50;
    }
  }

  // Next channel (same category, next number)
  const sameCategory = channels.filter(
    (ch) => ch.category_id === channel.category_id && ch.id !== channel.id
  );

  return (
    <div
      className="player-screen"
      onClick={handleScreenClick}
      style={{ cursor: showOverlay ? "default" : "none" }}
    >
      {/* Simulated stream background */}
      <div className="stream-bg" style={{ "--ch-color": channel.color }}>
        <div className="stream-scan" />
        <div className="stream-center">
          <div
            className="stream-logo"
            style={{ background: channel.color }}
          >
            {channel.initials}
          </div>
          <div className="stream-channel-name">{channel.name}</div>
          <div className="stream-live-badge">
            <span className="live-dot" />
            LIVE
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className={`player-overlay ${showOverlay ? "visible" : ""}`}>
        {/* Top bar */}
        <div className="player-topbar">
          <button className="player-back-btn" onClick={(e) => { e.stopPropagation(); onBack(); }}>
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>

          <div className="player-clock">{formatTime(currentTime)}</div>
        </div>

        {/* Bottom info bar */}
        <div className="player-bottombar">
          <div className="player-channel-info">
            <div
              className="player-channel-logo"
              style={{ background: channel.color }}
            >
              {channel.initials}
            </div>
            <div className="player-channel-meta">
              <div className="player-channel-top">
                <span className="player-channel-num">CH {channel.number}</span>
                {category && (
                  <span className="player-category-badge">
                    {category.icon} {category.name}
                  </span>
                )}
              </div>
              <div className="player-channel-name">{channel.name}</div>
              <div className="player-program">{channel.now_playing}</div>
              <div className="player-schedule">
                {channel.start} – {channel.end}
              </div>
            </div>
          </div>

          <div className="player-controls">
            <button
              className={`player-fav-btn ${isFav ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(channel.id);
              }}
            >
              {isFav ? "★" : "☆"}
              {isFav ? " Favorited" : " Add to Favorites"}
            </button>
          </div>

          {/* Progress bar */}
          <div className="player-progress-wrapper">
            <span className="progress-start">{channel.start}</span>
            <div className="player-progress-track">
              <div
                className="player-progress-fill"
                style={{ width: `${getProgress()}%` }}
              />
              <div
                className="player-progress-thumb"
                style={{ left: `${getProgress()}%` }}
              />
            </div>
            <span className="progress-end">{channel.end}</span>
          </div>
        </div>
      </div>

      {/* Up next sidebar */}
      {showOverlay && sameCategory.length > 0 && (
        <div
          className="up-next-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="up-next-label">More in {category?.name ?? "Category"}</p>
          {sameCategory.slice(0, 4).map((ch) => (
            <button
              key={ch.id}
              className="up-next-item"
              onClick={() => {
                /* parent will handle via onWatch — for now navigate directly */
                onBack();
                setTimeout(() => {}, 0);
              }}
            >
              <div
                className="up-next-logo"
                style={{ background: ch.color }}
              >
                {ch.initials}
              </div>
              <div className="up-next-info">
                <span className="up-next-name">{ch.name}</span>
                <span className="up-next-program">{ch.now_playing}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
