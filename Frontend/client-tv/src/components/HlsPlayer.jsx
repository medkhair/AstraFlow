import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

function HlsPlayer({ src, volume = 0, onBack }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync volume -> video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = volume === 0;
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;
    setLoading(true);
    setError(null);

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setLoading(false);
          setError("Stream unavailable");
        }
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      const onMeta = () => { setLoading(false); video.play().catch(() => {}); };
      const onErr = () => { setLoading(false); setError("Stream unavailable"); };
      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("error", onErr);
      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("error", onErr);
      };
    } else {
      setLoading(false);
      setError("HLS not supported in this browser");
    }
  }, [src]);

  return (
    <div className="hls-player-wrapper">
      {loading && (
        <div className="player-stream-state">
          <span className="player-stream-spinner" />
          <p>Loading stream…</p>
        </div>
      )}
      {error && !loading && (
        <div className="player-stream-state">
          <span className="player-stream-icon">📡</span>
          <p>{error}</p>
          {onBack && (
            <button className="player-back-btn" onClick={onBack}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Channels
            </button>
          )}
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="hls-video"
      />
    </div>
  );
}

export default HlsPlayer;