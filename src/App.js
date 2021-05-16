import { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import songData from "./data";
import Library from "./components/Library";
import Nav from './components/Nav';

function App() {
  // state
  const [songIndex, setSongIndex] = useState(0);
  const [songs, setSongs] = useState(songData());
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState({
    currentTime: null,
    duration: null,
    animationPercentage: 0,
  });
  const [libraryOpenStatus, setlibraryOpenStatus] = useState(false)
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const { duration, currentTime } = e.target;

    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongTime({ ...songTime, duration, currentTime, animationPercentage: animation });
  };
  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex+1)%songs.length])
    if(isPlaying) audioRef.current.play(); 
  }
  return (
    <div className={`App ${libraryOpenStatus ? 'library-active': ''}`}>
      <Nav libraryOpenStatus={libraryOpenStatus} setlibraryOpenStatus={setlibraryOpenStatus}/>
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songIndex={songIndex}
        setSongs={setSongs}
        setSongIndex={setSongIndex}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songs={songs}
        songTime={songTime}
        setSongTime={setSongTime}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        libraryOpenStatus={libraryOpenStatus}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
