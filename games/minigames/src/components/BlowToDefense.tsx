import React, { useRef, useState } from "react";

const BlowToDefense = () => {
  const [count, setCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  console.log(count);

  const handleMicInput = async () => {
    const audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 2048;
    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const data = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barWidth = canvasWidth / bufferLength;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (level: number) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "green";
      ctx.fillRect(0, canvasHeight - level, canvasWidth, level);
    };

    const drawFrame = () => {
      requestAnimationFrame(drawFrame);
      analyzer.getByteFrequencyData(data);

      const sum = data.reduce((acc, cur) => acc + cur, 0);
      const level = sum / data.length;
      draw(level);

      if (level > 50) {
        setCount((prevCount) => prevCount + 1);
      }
    };
    drawFrame();
  };

  return (
    <div>
      <canvas ref={canvasRef} width={300} height={100} />
      {count >= 50 ? <div>성공!</div> : null}
      <button onClick={handleMicInput}>마이크 입력 시작</button>
    </div>
  );
};

export default BlowToDefense;
