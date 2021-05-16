const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} className={`music-image ${isPlaying? 'playing': ''}`} alt={`${currentSong.name} Cover art`} />
      <h1>{currentSong.name}</h1>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
