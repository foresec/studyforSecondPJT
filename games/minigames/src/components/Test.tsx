import  { useState, useEffect, useRef} from 'react';




// 특정 마이크 볼륨을 넘으면 cnt 수를 높여서 cnt가 몇퍼 이상이면 성공
// 특정 마이크 볼륨이 들어오고잇음은 알려줘야함
// 이미지적으로 특정 마이크 볼륨을 넘을 시, 마법진의 색깔변화
const BlowToDefense = () => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let audioCtx = new (window.AudioContext || window.AudioContext)();
    let analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    let dataArray = new Uint8Array(analyser.frequencyBinCount);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        let source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        function updateVolume() {
          requestAnimationFrame(updateVolume);
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          let avg = sum / dataArray.length;
          setVolume(avg);
        }

        updateVolume();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // canvas 요소 생성 및 크기 설정
  const canvasRef = useRef(null);
  const WIDTH = 500;
  const HEIGHT = 50;
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');

    // 막대 그래프 그리기
    function draw() {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#1c1c1c';
      ctx.fillRect(0, 0, (volume / 255) * WIDTH, HEIGHT);
    }
    draw();
  }, [volume]);

  return (
    <div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
    </div>
  );
};

export default BlowToDefense;
