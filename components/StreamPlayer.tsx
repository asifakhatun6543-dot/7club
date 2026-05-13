'use client';

import Hls from 'hls.js';
import { useEffect, useMemo, useRef, useState } from 'react';

interface StreamPlayerProps {
  title: string;
  description: string;
  sources: Record<string, string>;
  subtitles: Array<{ label: string; src: string; srclang: string }>;
  externalUrl: string;
  onNext: () => void;
}

export default function StreamPlayer({ title, description, sources, subtitles, externalUrl, onNext }: StreamPlayerProps) {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState(Object.keys(sources)[0] || 'Default');
  const [upNextCountdown, setUpNextCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);

  const sourceUrl = useMemo(() => sources[quality] || externalUrl, [quality, externalUrl, sources]);

  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    video.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    if (sourceUrl.endsWith('.m3u8') && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(sourceUrl);
      hls.attachMedia(video);
    } else {
      video.src = sourceUrl;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [sourceUrl]);

  useEffect(() => {
    if (!showCountdown) return;
    const interval = setInterval(() => {
      setUpNextCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showCountdown, onNext]);

  return (
    <div className="stream-player-container">
      <div className="player-shell">
        <video
          ref={playerRef}
          className="stream-video"
          src={sourceUrl}
          controls={false}
          preload="metadata"
          poster=""
          onTimeUpdate={(event) => setProgress((event.currentTarget.currentTime / event.currentTarget.duration) * 100 || 0)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setShowCountdown(true);
          }}
        >
          {subtitles.map((subtitle) => (
            <track key={subtitle.src} label={subtitle.label} kind="subtitles" srcLang={subtitle.srclang} src={subtitle.src} default={subtitle.label === 'English'} />
          ))}
        </video>

        <div className="player-overlay">
          <div className="player-meta">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="player-controls">
            <button
              className="player-button"
              onClick={() => {
                if (!playerRef.current) return;
                if (playing) playerRef.current.pause(); else playerRef.current.play();
              }}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button className="player-button" onClick={() => { if (playerRef.current) playerRef.current.currentTime = Math.max(0, (playerRef.current.currentTime || 0) - 10); }}>
              -10s
            </button>
            <button className="player-button" onClick={() => { if (playerRef.current) playerRef.current.currentTime = Math.min(playerRef.current.duration || 0, (playerRef.current.currentTime || 0) + 10); }}>
              +10s
            </button>
            <div className="player-dropdown">
              <label>Quality</label>
              <select className="input-field" value={quality} onChange={(e) => setQuality(e.target.value)}>
                {Object.keys(sources).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="player-dropdown">
              <label>Speed</label>
              <select className="input-field" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((value) => (
                  <option key={value} value={value}>{value}x</option>
                ))}
              </select>
            </div>
            <button className="player-button" onClick={() => playerRef.current?.requestPictureInPicture?.()}>PiP</button>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          {showCountdown && (
            <div className="up-next-banner">
              <p>Up next in {upNextCountdown}s</p>
              <button className="player-button" onClick={onNext}>Play next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
