import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialSeconds: number;
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) {
      onComplete && onComplete();
      return;
    }
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  return <span>{seconds}s</span>;
};

export default Timer;
