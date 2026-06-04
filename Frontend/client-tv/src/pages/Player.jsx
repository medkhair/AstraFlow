import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useChannels } from "../hooks/useChannels";
import { useChannelCategories } from "../hooks/useChannelCategories";
import HlsPlayer from "../components/HlsPlayer";

/* ─── Route wrapper ─────────────────────────────────────── */
export function PlayerPage({ favorites, toggleFavorite }) {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { channels, isLoading } = useChannels();

  if (isLoading) {
    return (
      <div className="player-screen" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="player-stream-spinner" />
      </div>
    );
  }

  const channel = channels.find((ch) => ch.id === channelId);
  if (!channel) return <Navigate to="/" replace />;

  return (
    <Player
      channel={channel}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      onBack={() => navigate("/")}
      onWatch={(ch) => navigate(`/player/${ch.id}`)}
    />
  );
}

/* ─── Player UI ─────────────────────────────────────────── */
function Player({ channel, favorites, toggleFavorite, onBack, onWatch }) {
  const { channels } = useChannels();
  const { categories } = useChannelCategories();
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [volume, setVolume] = useState(0);
  const isFav = favorites.includes(channel.id);
  const category = categories.find((c) => c.id === channel.category_id);

  // Show overlay on any key press or mouse move
  const revealOverlay = () => setShowOverlay(true);

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

  // Keyboard controls
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') { onBack(); return; }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setVolume((v) => Math.min(1, Math.round((v + 0.1) * 10) / 10));
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setVolume((v) => Math.max(0, Math.round((v - 0.1) * 10) / 10));
      }
      revealOverlay();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onBack]);

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
      onMouseMove={revealOverlay}
      style={{ cursor: showOverlay ? "default" : "none" }}
    >
      {/* HLS stream */}
      <div className="stream-bg" onClick={(e) => e.stopPropagation()}>
        <HlsPlayer src={channel.stream_url} volume={volume} onBack={onBack} />
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

          <div className="player-topbar-center">
            <div className="player-live-badge">
              <span className="live-dot" />
              LIVE
            </div>
            <span className="player-topbar-channel">{channel.name}</span>
          </div>

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

            {/* Volume control */}
            <div className="player-volume" onClick={(e) => e.stopPropagation()}>
              <button
                className="player-volume-icon"
                onClick={() => setVolume((v) => v === 0 ? 0.5 : 0)}
                title={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.146 5.146a.5.5 0 01.708 0 5 5 0 010 7.072.5.5 0 11-.708-.708 4 4 0 000-5.656.5.5 0 010-.708z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10a7.971 7.971 0 00-2.343-5.657 1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                className="player-volume-slider"
                min="0"
                max="1"
                step="0.05"
                value={volume}                style={{ backgroundSize: `${volume * 100}% 100%` }}                onChange={(e) => setVolume(Number(e.target.value))}
              />
              <span className="player-volume-pct">{Math.round(volume * 100)}%</span>
            </div>
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
              onClick={() => onWatch(ch)}
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
