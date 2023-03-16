import { useEffect, useRef, useState } from "react";

interface TimerProps {
  onTime: boolean;
  handleTimer: () => void;
}

const Timer = ({ onTime, handleTimer }: TimerProps) => {
  // 초(sec) 상태를 관리하는 state
  const [sec, setSec] = useState<number>(10);

  const time = useRef<number>(10);
  const timeId = useRef<NodeJS.Timeout | null>(null);

  // 게임 여부를 따져서 타이머 설정
  useEffect(() => {
    // 게임 중이라면
    if (onTime) {
      timeId.current = setInterval(() => {
        time.current -= 1;
        // 초 UPDATE
        setSec(time.current % 60);
      }, 1000);
      // clearInterval함수로 타이머를 정지시킴
      return () => clearInterval(timeId.current as NodeJS.Timeout);
    }
  }, [onTime]);

  // time.current가 0이 되었을 때
  useEffect(() => {
    if (time.current <= 0) {
      // 타이머 정지
      clearInterval(timeId.current as NodeJS.Timeout);
      // 시간이 끝났으므로 게임진행여부 false로
      handleTimer();
    }
    // eslint-disable-next-line
  }, [sec]);

  return (
    <div>
      <h3>Timer</h3>
      <div>{sec}초</div>
    </div>
  );
};

export default Timer;
