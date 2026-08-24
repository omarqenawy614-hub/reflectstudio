import { useEffect, useRef, useState } from "react";
import soundFile from "../assets/audio/reflect-ambient.mp3";

export default function SoundToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(soundFile);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const tryPlay = () => {
      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeListeners();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    };

    const removeListeners = () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };

    tryPlay();

    window.addEventListener("click", tryPlay, { once: false });
    window.addEventListener("touchstart", tryPlay, { once: false });
    window.addEventListener("keydown", tryPlay, { once: false });

    return () => {
      removeListeners();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  function toggleSound() {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  return (
    <button className="sound-toggle" onClick={toggleSound} aria-label={isPlaying ? "Mute sound" : "Play sound"}>
      {isPlaying ? (
        <span className="sound-waves">
          <i />
          <i />
          <i />
        </span>
      ) : (
        <span className="sound-lines">
          <i />
          <i />
          <i />
        </span>
      )}
    </button>
  );
}