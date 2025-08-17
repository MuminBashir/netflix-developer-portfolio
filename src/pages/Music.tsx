import React, { useEffect, useState, useRef } from "react";
import "./Music.css";
import { MusicData, Album, Song } from "../types";
import { getMusic } from "../queries/getMusic";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

type TabType = "favorites" | "genre";

const Music: React.FC = () => {
  const [musicData, setMusicData] = useState<MusicData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("favorites");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchMusic() {
      const data = await getMusic();
      setMusicData(data);
      if (data && data.favoriteGenres.length > 0) {
        setSelectedGenre(data.favoriteGenres[0]);
      }
    }

    fetchMusic();
  }, []);

  // Cleanup audio when component unmounts or page changes
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  // Update progress bar
  useEffect(() => {
    if (currentAudio) {
      const updateTime = () => setCurrentTime(currentAudio.currentTime);
      const updateDuration = () => setDuration(currentAudio.duration);

      currentAudio.addEventListener("timeupdate", updateTime);
      currentAudio.addEventListener("loadedmetadata", updateDuration);
      currentAudio.addEventListener("durationchange", updateDuration);

      return () => {
        currentAudio.removeEventListener("timeupdate", updateTime);
        currentAudio.removeEventListener("loadedmetadata", updateDuration);
        currentAudio.removeEventListener("durationchange", updateDuration);
      };
    }
  }, [currentAudio]);

  const handlePlayPause = (song: Song, album: Album) => {
    const trackId = `${album.title}-${song.title}`;

    // If same track is playing, toggle play/pause
    if (playingTrack === trackId && currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play().catch(() => {
          // Audio file not found, do nothing
        });
        setIsPlaying(true);
      }
      return;
    }

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new audio instance
    const audio = new Audio(song.musicLink);
    audio.addEventListener("ended", () => {
      setPlayingTrack(null);
      setIsPlaying(false);
      setCurrentAudio(null);
      setCurrentSong(null);
      setCurrentAlbum(null);
      setCurrentTime(0);
      setDuration(0);
    });

    audio.addEventListener("error", () => {
      // Audio file not found, do nothing
      setPlayingTrack(null);
      setIsPlaying(false);
      setCurrentAudio(null);
      setCurrentSong(null);
      setCurrentAlbum(null);
      setCurrentTime(0);
      setDuration(0);
    });

    setCurrentAudio(audio);
    setPlayingTrack(trackId);
    setIsPlaying(true);
    setCurrentSong(song);
    setCurrentAlbum(album);

    audio.play().catch(() => {
      // Audio file not found, reset state
      setPlayingTrack(null);
      setIsPlaying(false);
      setCurrentAudio(null);
      setCurrentSong(null);
      setCurrentAlbum(null);
      setCurrentTime(0);
      setDuration(0);
    });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentAudio || !duration) return;

    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;

    currentAudio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getFavoriteMusics = (): Song[] => {
    if (!musicData) return [];
    return musicData.favoriteMusics || [];
  };

  const getGenreSongs = (): Song[] => {
    if (!musicData || activeTab !== "genre" || !selectedGenre) return [];
    return musicData.playlist[selectedGenre] || [];
  };

  if (!musicData)
    return <div className="loading">Loading musical treasures...</div>;

  return (
    <div className="music-page">
      <div className="music-header">
        <h1 className="music-title">🎵 Musical Journey</h1>
        <div className="quote">
          <p>{musicData.quote}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          <FaMusic /> Favorites
        </button>
        <button
          className={`tab-button ${activeTab === "genre" ? "active" : ""}`}
          onClick={() => setActiveTab("genre")}
        >
          🎭 Genres
        </button>
      </div>

      {/* Genre Selection (when genre tab is active) */}
      {activeTab === "genre" && (
        <div className="genre-section">
          <div className="genres">
            {musicData.favoriteGenres.map((genre, index) => (
              <button
                key={index}
                className={`genre-card ${
                  selectedGenre === genre ? "active" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="albums-section">
        <h3>
          {activeTab === "favorites"
            ? "Favorite Music"
            : `${selectedGenre} Music`}
        </h3>

        {/* Favorites Tab - Show Favorite Songs */}
        {activeTab === "favorites" && (
          <div className="genre-songs">
            {getFavoriteMusics().map((song, index) => {
              const trackId = `${song.album || "unknown"}-${song.title}`;
              const isCurrentlyPlaying = playingTrack === trackId && isPlaying;

              // Create a mock album object for the song
              const mockAlbum: Album = {
                title: song.album || "Unknown Album",
                artist: song.artist,
                image: song.image || "/images/music/default-album.jpg",
                year: song.year || "Unknown",
                genre: "Favorite",
                songs: [song],
              };

              return (
                <div
                  key={`${song.title}-${index}`}
                  className="song-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="song-card-image-container">
                    <img
                      src={song.image || "/images/music/default-album.jpg"}
                      alt={song.album || song.title}
                      className="song-card-image"
                    />
                  </div>
                  <div className="song-card-content">
                    <div className="song-card-info">
                      <h4 className="song-card-title">{song.title}</h4>
                      <p className="song-card-artist">by {song.artist}</p>
                      {song.album && (
                        <p className="song-card-album">from {song.album}</p>
                      )}
                      {song.year && (
                        <span className="song-card-year">({song.year})</span>
                      )}
                    </div>
                    <div className="song-card-controls">
                      {isCurrentlyPlaying && (
                        <FaMusic className="playing-icon" />
                      )}
                      <button
                        className="music-play-btn"
                        onClick={() => handlePlayPause(song, mockAlbum)}
                      >
                        {isCurrentlyPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Genre Tab - Show Songs */}
        {activeTab === "genre" && (
          <div className="genre-songs">
            {getGenreSongs().map((song, index) => {
              const trackId = `${song.album || "unknown"}-${song.title}`;
              const isCurrentlyPlaying = playingTrack === trackId && isPlaying;

              // Create a mock album object for the song
              const mockAlbum: Album = {
                title: song.album || "Unknown Album",
                artist: song.artist,
                image: song.image || "/images/music/default-album.jpg",
                year: song.year || "Unknown",
                genre: selectedGenre,
                songs: [song],
              };

              return (
                <div
                  key={`${song.title}-${index}`}
                  className="song-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="song-card-image-container">
                    <img
                      src={song.image || "/images/music/default-album.jpg"}
                      alt={song.album || song.title}
                      className="song-card-image"
                    />
                  </div>
                  <div className="song-card-content">
                    <div className="song-card-info">
                      <h4 className="song-card-title">{song.title}</h4>
                      <p className="song-card-artist">by {song.artist}</p>
                      {song.album && (
                        <p className="song-card-album">from {song.album}</p>
                      )}
                      {song.year && (
                        <span className="song-card-year">({song.year})</span>
                      )}
                    </div>
                    <div className="song-card-controls">
                      {isCurrentlyPlaying && (
                        <FaMusic className="playing-icon" />
                      )}
                      <button
                        className="music-play-btn"
                        onClick={() => handlePlayPause(song, mockAlbum)}
                      >
                        {isCurrentlyPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fixed Bottom Player Bar */}
      {currentSong && currentAlbum && (
        <div className="bottom-player-bar">
          {/* Progress Bar */}
          <div className="progress-bar-container" onClick={handleSeek}>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="player-content">
            <img
              src={currentAlbum.image}
              alt={currentAlbum.title}
              className="player-album-image"
            />
            <div className="player-song-info">
              <div className="player-song-title">{currentSong.title}</div>
              <div className="player-song-artist">
                {currentSong.artist} • {currentAlbum.title}
              </div>
            </div>
            <div className="player-time-info">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="duration">{formatTime(duration)}</span>
            </div>
            <div className="player-controls">
              <button
                className="player-play-button"
                onClick={() => handlePlayPause(currentSong, currentAlbum)}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <FaMusic className="player-playing-icon" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
