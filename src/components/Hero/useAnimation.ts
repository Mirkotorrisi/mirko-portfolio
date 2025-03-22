import { useEffect, useRef, useState } from "react";

const useAnimation = () => {
  const [tick, setTick] = useState(0);
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      if (deltaTime > 50) {
        previousTimeRef.current = time;
        setTick((prev) => (prev + 1) % 1000);
      }

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
    }
    requestRef.current = requestAnimationFrame(animate);
  };
  const transformedTick = Math.cos((tick / 1000) * 2 * Math.PI) * 100;
  return transformedTick;
};

export default useAnimation;
