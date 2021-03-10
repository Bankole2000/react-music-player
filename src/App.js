import { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import songData from "./data";
import Library from "./components/Library";

function App() {
  // state
  const [songIndex, setSongIndex] = useState(0);
  const [songs, setSongs] = useState(songData());
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState({
    currentTime: null,
    duration: null,
  });
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const { duration, currentTime } = e.target;
    setSongTime({ ...songTime, duration, currentTime });
  };
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songIndex={songIndex}
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
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
