import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

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
}) => {
  // State

  // Refs

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
  const skipNext = (e) => {
    console.log({ e });
    setSongIndex((songIndex += 1));
    setCurrentSong(songs[songIndex]);

    console.log({ songIndex });
  };
  const skipPrev = (e) => {
    setSongIndex((songIndex -= 1));
    setCurrentSong(songs[songIndex]);
    console.log({ songIndex });
    console.log({ e });
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{formatAsTime(songTime.currentTime)}</p>
        <input
          type="range"
          value={songTime.currentTime}
          onChange={dragHandler}
          min="0"
          max={songTime.duration || 1}
        />
        <p>{formatAsTime(songTime.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={skipPrev}
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
          onClick={skipNext}
          size="2x"
          icon={faFastForward}
        />
      </div>
    </div>
  );
};

export default Player;
