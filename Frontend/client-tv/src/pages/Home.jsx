import { useState, useEffect } from "react";
import { useChannels } from "../hooks/useChannels";
import { useChannelCategories } from "../hooks/useChannelCategories";
import { ChannelCard } from "../components/ChannelCard";

export function Home({ user, favorites, toggleFavorite, search, setSearch }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { channels, isLoading: channelsLoading } = useChannels();
  const { categories } = useChannelCategories();

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

  return (
    <div className="tv-app-body">
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
        {channelsLoading ? (
          <div className="empty-state">
            <span className="login-spinner" />
          </div>
        ) : visibleChannels.length === 0 ? (
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
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
