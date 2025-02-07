import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "./index.scss";

const Octahedron = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP({ scope: container }); // we can pass in a config object as the 1st parameter to make scoping simple

  useEffect(() => {
    if (window.innerWidth < 768) return;
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const handleMouse = contextSafe((e: MouseEvent) => {
    const x = -e.clientX * 0.125;
    const y = -e.clientY * 0.125;
    gsap.to(".wrapper", {
      duration: 0.5,
      x,
      y,
      rotateX: -(x % 360) + "deg",
      rotateY: -(y % 360) + "deg",
      ease: "power1.out",
      overwrite: "auto",
      stagger: 0.02,
    });
  });

  return (
    <div className="my-auto mx-auto z-20" ref={container}>
      <div className="wrapper absolute">
        <div className="octa absolute">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
      </div>
    </div>
  );
};

export default Octahedron;
