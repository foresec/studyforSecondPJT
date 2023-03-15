import { useEffect, useRef, useState } from "react";
import styles from "./test.module.css";
import beginning from "../assets/beginning.mp3";

const WebAudioBasic = () => {
  // HTML DOM 참조
  const audioRef = useRef<HTMLAudioElement>(null);
  // 재생여부 관리
  const [isPlaying, setIsPlaying] = useState(false);

  const start = () => {
    if(audioRef.current) {
      audioRef.current.play()
    }
    setIsPlaying(true)
  }

  const stop = ()=> {
    if(audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
  }

  useEffect(()=> {
    if(!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  },[isPlaying])

  return (
    <div className={styles.box}>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <audio ref={audioRef} src={beginning}>
        test1
      </audio>
      <audio controls src={beginning}>
        test2
      </audio>
    </div>
  );
};

export default WebAudioBasic;
