import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import SplitText from "./SplitText";
import { videos, videosSection } from "../data/videos";
import { artStyle } from "../utils/placeholderArt";

// ============================================================
// VIDEO SHOWCASE
// Big player (with its own control bar) + a strip of video cards
// lying on the "floor" that drift sideways, faded at both ends.
// Click a card to load that video into the big player.
// Videos / titles live in src/data/videos.js
// ============================================================

const fmt = (t) => {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const Icon = {
  play: <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" stroke="none" />,
  vol: <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4zM15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" />,
  mute: <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4zM16 9.5l5 5M21 9.5l-5 5" />,
  full: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
};

function Ico({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {Icon[name]}
    </svg>
  );
}

function Player({ video, index, autoStart }) {
  const wrapRef = useRef(null);
  const vidRef = useRef(null);
  const barRef = useRef(null);
  const hideTimer = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [idle, setIdle] = useState(false);
  const hasSrc = Boolean(video.src);

  // new video chosen -> reset (and play if the user picked it from a card)
  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setDur(0);
    const v = vidRef.current;
    if (v && hasSrc) {
      v.load();
      if (autoStart) v.play().catch(() => {});
    }
  }, [video.src, autoStart, hasSrc]);

  // pause when the section leaves the screen
  useEffect(() => {
    const panel = wrapRef.current?.closest("[data-panel]");
    if (!panel) return;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) vidRef.current?.pause();
    });
    io.observe(panel);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vidRef.current;
    if (!v || !hasSrc) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seek = (e) => {
    const v = vidRef.current;
    const bar = barRef.current;
    if (!v || !bar || !dur) return;
    const r = bar.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    v.currentTime = p * dur;
    setTime(p * dur);
  };

  const drag = (e) => {
    seek(e);
    const move = (ev) => seek(ev);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const setVol = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    if (vidRef.current) {
      vidRef.current.volume = val;
      vidRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  // hide the control bar a moment after the mouse stops (only while playing)
  const wake = () => {
    setIdle(false);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setIdle(true), 2200);
  };

  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <div
      className={`vs-player${playing && idle ? " is-idle" : ""}${playing ? " is-playing" : ""}`}
      ref={wrapRef}
      onMouseMove={wake}
      onMouseLeave={() => playing && setIdle(true)}
    >
      {/* the picture */}
      <div className="vs-screen" onClick={toggle}>
        {hasSrc ? (
          <video
            ref={vidRef}
            src={video.src}
            poster={video.poster || undefined}
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
          />
        ) : (
          <div {...artStyle("vs-empty", video.poster, index)}>
            <span>Add your video in <b>src/data/videos.js</b></span>
          </div>
        )}

        {!playing && hasSrc && (
          <button type="button" className="vs-bigplay" aria-label="Play video">
            <Ico name="play" />
          </button>
        )}
        <span className="vs-title-tag">{video.title}</span>
      </div>

      {/* the control bar */}
      <div className="vs-controls">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} disabled={!hasSrc}>
          <Ico name={playing ? "pause" : "play"} />
        </button>

        <span className="vs-time">{fmt(time)}</span>

        <div className="vs-seek" ref={barRef} onPointerDown={drag} role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(time)}>
          <span className="vs-seek-fill" style={{ width: `${pct}%` }} />
          <span className="vs-seek-dot" style={{ left: `${pct}%` }} />
        </div>

        <span className="vs-time">{fmt(dur)}</span>

        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          <Ico name={muted || volume === 0 ? "mute" : "vol"} />
        </button>
        <input className="vs-vol" type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={setVol} aria-label="Volume" />

        <button type="button" onClick={fullscreen} aria-label="Fullscreen">
          <Ico name="full" />
        </button>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);

  // two rows of cards, the second row runs the other way
  const rowA = videos.filter((_, i) => i % 2 === 0);
  const rowB = videos.filter((_, i) => i % 2 === 1);

  const renderCard = (v, i, k) => (
    <button
      type="button"
      key={k}
      className={`vs-card${active === i ? " is-active" : ""}`}
      onClick={() => {
        setActive(i);
        setPicked(true);
      }}
      aria-label={`Play ${v.title}`}
    >
      <span {...artStyle("vs-card-bg", v.poster, i)} />
      <span className="vs-card-shade" />
      <span className="vs-card-play">
        <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" /></svg>
      </span>
      <span className="vs-card-title">{v.title}</span>
    </button>
  );

  const row = (list, ids, dir) => {
    // repeat the list so the strip is long enough to loop seamlessly
    const base = [];
    for (let r = 0; r < 4; r++) list.forEach((v, j) => base.push({ v, i: ids[j] }));
    return (
      <div className={`vs-row ${dir}`}>
        <div className="vs-row-track">
          {[...base, ...base].map((c, n) => renderCard(c.v, c.i, n))}
        </div>
      </div>
    );
  };

  const idsA = videos.map((_, i) => i).filter((i) => i % 2 === 0);
  const idsB = videos.map((_, i) => i).filter((i) => i % 2 === 1);

  return (
    <Section id="videos" className="vs-section">
      <div className="vs-stage">
        <div className="vs-head">
          <div className="eyebrow rv">
            <span className="line" />
            {videosSection.eyebrow}
          </div>
          <SplitText as="h2" className="section-title" delay={120}>
            {videosSection.title[0]} <span className="gradient-text">{videosSection.title[1]}</span>
          </SplitText>
        </div>

        <div className="rv rv-fade" style={{ "--rd": "300ms" }}>
          <Player video={videos[active]} index={active} autoStart={picked} />
        </div>

        {/* cards lying on the floor, drifting sideways */}
        <div className="vs-floor rv" style={{ "--rd": "550ms" }}>
          <div className="vs-plane">
            {row(rowA, idsA, "to-left")}
            {row(rowB, idsB, "to-right")}
          </div>
        </div>
      </div>
    </Section>
  );
}
