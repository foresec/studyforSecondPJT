import React, { useState, useRef, useEffect } from "react";

import spell1 from "../assets/spell1.png";
import spell2 from "../assets/spell2.png";
import brokenspell from "../assets/brokenspell.png";

interface onTimeProp {
  onTime: boolean;
  handleTimer: () => void;
}

// 성공 클릭수 설정(50~110, 플레이타임 10초 기준)
const end = Math.round(Math.random() * 60 + 50);
// const end = 10

const ClickToDefense = ({ onTime, handleTimer }: onTimeProp) => {
  // 게임의 성공/실패를 관리하는 state(기본이 실패)
  const [isSuccess, setIsSuccess] = useState(false);

  // 클릭수를 관리하는 state
  const [clicked, setClicked] = useState<number>(0);

  // 클릭에 따라 달라지는 Img를 관리하는 state
  const [spellImg, setSpellImg] = useState(spell1);

  // 클릭신호를 받는 useRef
  const clickedSpell = useRef<HTMLDivElement>(null);

  // 시작부터 자동 focus
  useEffect(() => {
    if (clickedSpell.current) {
      clickedSpell.current.focus();
    }
  }, []);

  // 해당 이벤트의 키가 space라면 클릭수 + 1
  const addClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Space") {
      setClicked(clicked + 1);
    }
  };

  useEffect(() => {
    // 게임 시간내일 때
    if (onTime) {
      if (clicked >= 5 && clicked < end) {
        setSpellImg(spell2);
      } else if (clicked >= end) {
        setSpellImg(brokenspell);
        // 게임 정지
        handleTimer();
        // 성공 전달
        setIsSuccess(true);
      }
    }
  }, [clicked, onTime, handleTimer]);

  return (
    <div>
      <div ref={clickedSpell} tabIndex={0} onKeyUp={addClick}></div>
      <img src={spellImg} alt="img" />
      <h3>RESULT</h3>
      {onTime ? (
        <div>{clicked}번이나 스페이스바가 무리하는 중...😥</div>
      ) : isSuccess ? (
        <div>성공!! {end}번이나 하다니!!😀</div>
      ) : (
        <div>실패.. {end}번도 못하네ㅋㅋ🤣</div>
      )}
    </div>
  );
};

export default ClickToDefense;
