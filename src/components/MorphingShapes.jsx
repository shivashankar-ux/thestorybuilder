import { useEffect, useState, useCallback } from "react";

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 },
];

export default function MorphingShapes() {
  const [comboIndex, setComboIndex] = useState(0);

  const nextCombo = useCallback(() => {
    setComboIndex((prev) => {
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * combinations.length);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(nextCombo, 3000);
    return () => clearInterval(interval);
  }, [nextCombo]);

  const combo = combinations[comboIndex];

  return (
    <div className="morph-shapes-box">
      <div
        id="morph-wrapper"
        data-configuration={combo.configuration}
        data-roundness={combo.roundness}
        onClick={nextCombo}
        title="Click to morph shapes!"
      >
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
      </div>
      <div className="morph-hint">✨ Click shapes to morph</div>
    </div>
  );
}
