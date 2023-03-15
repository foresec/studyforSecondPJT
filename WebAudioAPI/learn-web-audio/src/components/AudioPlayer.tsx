import React, { useRef, useEffect } from 'react';
import beginning from "../assets/beginning.mp3";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  
  useEffect(() => {
    
    if (audioRef.current) {
      // AudioContext 생성
      audioContextRef.current = new AudioContext();

      // MediaElementAudioSourceNode 생성 및 연결
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );
      sourceNodeRef.current.connect(audioContextRef.current.destination);

      // AudioContext가 정지 상태인 경우, 첫 번째 유저 상호 작용 시 재개
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }

    return () => {
      // AudioContext 닫기
      audioContextRef.current?.close();
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current?.paused) {
      console.log(audioRef.current?.paused, "play")
      audioRef.current.play();
    } else {
      console.log(audioRef.current?.paused, "pause")
      audioRef.current?.pause();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={beginning}></audio>
      <button onClick={handlePlayPause}>{audioRef.current?.paused ? 'Play' : 'Pause'}</button>
    </div>
  );
};

export default AudioPlayer;