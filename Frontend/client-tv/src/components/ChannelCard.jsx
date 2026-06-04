import { useNavigate } from "react-router-dom";

export function ChannelCard({ channel, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div
      className="channel-card"
      onClick={() => navigate(`/player/${channel.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/player/${channel.id}`)}
      aria-label={`Watch ${channel.name}`}
    >
      <div className="card-logo" style={{ background: channel.color }}>
        <span>{channel.initials}</span>
      </div>

      <div className="card-body">
        <div className="card-header">
          <span className="card-number">CH {channel.number}</span>
          <span className="card-live">
            <span className="live-dot" />
            LIVE
          </span>
        </div>
        <p className="card-name">{channel.name}</p>
        <p className="card-program">{channel.now_playing}</p>
        <p className="card-schedule">
          {channel.start} – {channel.end}
        </p>
      </div>

      <button
        className={`card-fav-btn ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(channel.id);
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}
