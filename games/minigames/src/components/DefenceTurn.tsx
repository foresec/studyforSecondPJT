import { useState, useCallback } from "react";

import ClickToDefense from "./ClickToDefense";
import Timer from "./Timer";

import styles from "./DefenceTurn.module.css";

const DefenceTurn = () => {
  // 게임이 진행되는 중인지 판단하는 state
  const [onTime, setOnTime] = useState<boolean>(true);

  // 게임이 끝남을 수행하는 function
  const handleTimer = useCallback(() => {
    setOnTime(false);
  }, []);

  return (
    <div className={styles.box}>
      <div>
        <h1>DEFENSE</h1>
        <Timer handleTimer={handleTimer} onTime={onTime} />
        <ClickToDefense handleTimer={handleTimer} onTime={onTime} />
      </div>
    </div>
  );
};

export default DefenceTurn;
