import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryOpenStatus }) => {
  return (
    <div className={`library ${libraryOpenStatus ? 'active-library':''}`}>
      <h1>Library</h1>
      {songs.map((song) => (
        <LibrarySong
          song={song}
          setSongs={setSongs}
          isPlaying={isPlaying}
          key={song.id}
          audioRef={audioRef}
          setCurrentSong={setCurrentSong}
          songs={songs}
        />
      ))}
    </div>
  );
};

export default Library;
