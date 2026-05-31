import { useState, useEffect } from "react";
import { channels, categories } from "../data/data";
import { ChannelCard } from "../components/ChannelCard";

export function Home({ user, favorites, toggleFavorite, onWatch, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const visibleChannels = channels.filter((ch) => {
    if (activeCategory === "favorites") return favorites.includes(ch.id);
    const matchesCategory =
      activeCategory === "all" || ch.category_id === activeCategory;
    const matchesSearch =
      !search ||
      ch.name.toLowerCase().includes(search.toLowerCase()) ||
      String(ch.number).includes(search);
    return matchesCategory && matchesSearch;
  });

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) =>
    date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="tv-app">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-brand">
          <svg
            className="brand-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="10"
              width="22"
              height="14"
              rx="3"
              fill="#7c3aed"
              opacity="0.2"
            />
            <rect
              x="5"
              y="10"
              width="22"
              height="14"
              rx="3"
              stroke="#7c3aed"
              strokeWidth="1.5"
            />
            <rect
              x="2"
              y="6"
              width="22"
              height="14"
              rx="3"
              fill="#7c3aed"
              opacity="0.4"
            />
            <rect
              x="2"
              y="6"
              width="22"
              height="14"
              rx="3"
              stroke="#a855f7"
              strokeWidth="1.5"
            />
          </svg>
          <span className="brand-name">AstraFlow</span>
        </div>

        <div className="topbar-search">
          <svg viewBox="0 0 20 20" fill="currentColor" className="search-icon">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="topbar-right">
          <div className="topbar-clock">
            <span className="clock-time">{formatTime(currentTime)}</span>
            <span className="clock-date">{formatDate(currentTime)}</span>
          </div>
          <div className="topbar-user">
            <div className="user-avatar">{user.full_name[0]}</div>
            <div className="user-info">
              <span className="user-name">{user.full_name}</span>
              <span className="user-plan">{user.subscription.plan}</span>
            </div>
          </div>
          <button className="signout-btn" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <nav className="category-nav">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-tab ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setSearch("");
            }}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span>{cat.name}</span>
            {cat.id === "favorites" && (
              <span className="cat-badge">{favorites.length}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Channel Grid */}
      <main className="channel-grid-wrapper">
        {visibleChannels.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📺</span>
            <p>
              {activeCategory === "favorites"
                ? "No favorite channels yet. Star a channel to add it here."
                : "No channels found matching your search."}
            </p>
          </div>
        ) : (
          <div className="channel-grid">
            {visibleChannels.map((ch) => (
              <ChannelCard
                key={ch.id}
                channel={ch}
                isFavorite={favorites.includes(ch.id)}
                onToggleFavorite={toggleFavorite}
                onWatch={onWatch}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
