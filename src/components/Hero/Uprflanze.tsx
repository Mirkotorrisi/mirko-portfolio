import React, { useEffect, useState } from "react";
import { initUrpflanze } from "./urpflanze";
import useAnimation from "./useAnimation";

const Uprflanze = () => {
  const tick = useAnimation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {}, [mouse.x, mouse.y]);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const handleMouse = (e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };
  initUrpflanze(tick, mouse.x, mouse.y);
  return (
    <div className="absolute w-full h-full bg-primary z-0" id="urpflanze" />
  );
};

export default Uprflanze;
