import { useEffect, useState } from "react";

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 },
];

export default function MorphingShapes() {
  const [combo, setCombo] = useState(combinations[0]);

  useEffect(() => {
    let prevIndex = 0;
    const interval = setInterval(() => {
      let nextIndex = prevIndex;
      while (nextIndex === prevIndex) {
        nextIndex = Math.floor(Math.random() * combinations.length);
      }
      prevIndex = nextIndex;
      setCombo(combinations[nextIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="morph-wrapper"
      data-configuration={combo.configuration}
      data-roundness={combo.roundness}
      aria-hidden="true"
    >
      <div className="shape" />
      <div className="shape" />
      <div className="shape" />
      <div className="shape" />
      <div className="shape" />
      <div className="shape" />
      <div className="shape" />
    </div>
  );
}
