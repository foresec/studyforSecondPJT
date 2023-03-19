import { useState, useEffect, useRef } from "react";
//
const BlowToDefense = () => {
  const [volume, setVolume] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const canvasCtx = canvas.getContext("2d");
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    let drawVisual: number;

    const startAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 4096;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        const sliceWidth = WIDTH * 1.0 / bufferLength;

        const draw = () => {
          drawVisual = requestAnimationFrame(draw);
					setTimeout(draw, 1000/100);

          analyser.getByteTimeDomainData(dataArray);
					console.log("do")
          canvasCtx!.fillStyle = "rgb(200, 200, 200)";
          canvasCtx!.fillRect(0, 0, WIDTH, HEIGHT);

          canvasCtx!.lineWidth = 2;
          canvasCtx!.strokeStyle = "rgb(0, 0, 0)";

          canvasCtx!.beginPath();

          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * HEIGHT / 2;

            if (i === 0) {
              canvasCtx!.moveTo(x, y);
            } else {
              canvasCtx!.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasCtx!.lineTo(canvas.width, canvas.height / 2);
          canvasCtx!.stroke();
        };

        draw();

        streamRef.current = stream;
        audioContextRef.current = audioContext;
      } catch (error) {
        console.error(error);
      }
    };

    startAudioContext();

    return () => {
      if (drawVisual) {
        cancelAnimationFrame(drawVisual);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width="500" height="200"></canvas>
    </div>
  );
};

export default BlowToDefense;
