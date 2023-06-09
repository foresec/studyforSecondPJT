import { useEffect, useRef, useState } from "react";

interface TimerProps {
  onTime: boolean;
  handleTimer: () => void;
  isDone:boolean
  handleResult : ()=>void
}

const Timer = ({ onTime, handleTimer, isDone ,handleResult}: TimerProps) => {
  // 초(sec) 상태를 관리하는 state
  const [sec, setSec] = useState<number>(10);

  const time = useRef<number>(10);
  const timeId = useRef<NodeJS.Timeout | null>(null);

  // 3,2,1 CountDown 관리 state
  const [preSec, setPreSec] = useState<number>(3)

  const preTime = useRef<number>(3);
  const preTimeId = useRef<NodeJS.Timeout | null>(null);

  // 3,2,1 CountDown
  useEffect(()=> {
    preTimeId.current = setInterval(()=> {
      preTime.current -= 1
      setPreSec(preTime.current % 60)
      // 0이되면 게임을 시작시킴
      if (preTime.current === 0) {
        clearInterval(preTimeId.current as NodeJS.Timeout)
        handleTimer()
      }
    }, 1000)
    return () => clearInterval(preTimeId.current as NodeJS.Timeout);
    // eslint-disable-next-line
  },[])


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
      handleResult()
    }
    // eslint-disable-next-line
  }, [sec]);

  return (
    <div>
      {!onTime && !isDone ? <div>{preSec}</div>:<div>시작!</div>}
      <h3>Timer</h3>
      <div>{sec}</div>
    </div>
  );
};

export default Timer;
