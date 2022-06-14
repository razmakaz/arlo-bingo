import { useEffect, useRef, useState } from "react"

/**
 * 
 * @param {*} soundFile 
 * @param {*} options { volume, pitch }
 * @returns 
 */
const useSound = (file, volume = 0.5) => {

  let soundRef = useRef(null);
  let [isPlaying, setPlaying] = useState(false);
  
  useEffect(() => {
    let soundNode = document.createElement('audio');

    soundNode.src = file;
    soundNode.volume = volume;
    soundNode.onplay = () => setPlaying(true);
    soundNode.onpause = () => setPlaying(false);
    soundRef.current = soundNode;

    return () => {
      soundNode.remove();
    }
  }, [file]);

  /**
   * Plays the audio as long as sound is enabled.
   * If the sound is already playing, stop and reset it
   * before trying to play again, otherwise the sound
   * won't play.
   * @returns 
   */
  const play = () => {
    if (isPlaying) stop();
    soundRef.current.play();
  }

  /**
   * Stops the sound and resets the position to 
   * the beginning.
   */
  const stop = () => {
    soundRef.current.pause();
    soundRef.current.currentTime = 0;
  }

  return [
    play,
    stop,
  ]
}

export default useSound;