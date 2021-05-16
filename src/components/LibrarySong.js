import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);

    const newSongs = songs.map((singleSong) => {
      if (singleSong.id === song.id) {
        return {
          ...singleSong,
          active: true,
        };
      } else {
        return {
          ...singleSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={`${song.name} Cover art`} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
