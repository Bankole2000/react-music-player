import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songIndex,
  setSongIndex,
  setCurrentSong,
  songs,
  audioRef,
  songTime,
  setSongTime,
  setSongs
}) => {
  // State

  // Refs

  useEffect(() => {
    const newSongs = songs.map((singleSong) => {
      if (singleSong.id === currentSong.id) {
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
  }, [currentSong])

  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const formatAsTime = (time) => {
    return `${Math.floor(time / 60)} : ${("0" + Math.floor(time % 60)).slice(
      -2
    )}`;
  };
  const dragHandler = (e) => {
    setSongTime({ ...songTime, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };
  // const skipNext = (e) => {
  //   console.log({ e });
  //   setSongIndex((songIndex += 1));
  //   setCurrentSong(songs[songIndex]);

  //   console.log({ songIndex });
  // };
  // const skipPrev = (e) => {
  //   setSongIndex((songIndex -= 1));
  //   setCurrentSong(songs[songIndex]);
  //   console.log({ songIndex });
  //   console.log({ e });
  // };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skipForward'){
        setCurrentSong(songs[(currentIndex+1)%songs.length])
    } else if(direction === 'skipBackward'){
      if (currentIndex-1 < 0){
        setCurrentSong(songs[songs.length - 1])
      } else {
        setCurrentSong(songs[currentIndex-1])
      }
    }
    playAudio(isPlaying, audioRef)
  }

  const trackAnim = {
    transform: `translateX(${songTime.animationPercentage}%)`
  }
  return (
    <div className="player">
      <div className="time-control">
        <p>{formatAsTime(songTime.currentTime)}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
        <input
          type="range"
          value={songTime.currentTime || 0}
          onChange={dragHandler}
          min="0"
          max={songTime.duration || 1}
          />
        <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songTime.duration ? formatAsTime(songTime.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("skipBackward")}
          size="2x"
          icon={faFastBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("skipForward")}
          size="2x"
          icon={faFastForward}
        />
      </div>
    </div>
  );
};

export default Player;
