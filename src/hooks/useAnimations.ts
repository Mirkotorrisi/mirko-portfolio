import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const useAnimations = () => {
  const container = useRef(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo("#custom-pointer", "x", {
        duration: 0.2,
        ease: "power3",
      });
      yTo.current = gsap.quickTo("#custom-pointer", "y", {
        duration: 0.2,
        ease: "power3",
      });
    },
    { scope: container }
  );

  const showCustomCursor = contextSafe(() => {
    gsap.to("#custom-pointer", {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });
  });

  const hideCustomCursor = contextSafe(() => {
    gsap.to("#custom-pointer", {
      opacity: 0,
      scale: 0,
      duration: 0.3,
    });
  });

  const hideOpen = contextSafe(() => {
    gsap.to("#custom-pointer", {
      background: "#33FE00",
      duration: 0.3,
    });
    gsap.to("#pointer-message", {
      display: "hidden",
      opacity: 0,
      width: 0,
      height: 0,
      duration: 0.3,
    });
  });
  const showOpen = contextSafe(() => {
    gsap.to("#custom-pointer", {
      background: "black",
      duration: 0.3,
    });
    gsap.to("#pointer-message", {
      opacity: 1,
      duration: 0.3,
      width: "auto",
      height: "auto",
      display: "block",
    });
  });

  const moveCustomCursor = contextSafe((e: React.MouseEvent) => {
    xTo?.current?.(e.clientX);
    yTo?.current?.(e.clientY);
    gsap.to("#custom-pointer", {
      padding: "4rem",
      duration: 0.3,
      ease: "power1",
    });
    gsap.to("#custom-pointer", {
      padding: "1rem",
      duration: 0.5,
      ease: "power3",
    });
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch(".double-text", {
      interval: 0.5,
      batchMax: 4,
      start: "top 80%",

      onEnter: (batch) => {
        gsap.to(batch, {
          backgroundSize: "100% 100%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.25,
        });
      },
    });

    ScrollTrigger.batch(".line h2", {
      interval: 0.5,
      batchMax: 4,
      start: "bottom bottom",
      once: true,

      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          {
            skewY: 7,
            y: 100,
            once: true,
          },
          {
            skewY: 0,
            y: 0,
            ease: "power4.out",
            stagger: {
              amount: 0.5,
            },
            once: true,
          }
        );
      },
    });
  });

  return {
    container,
    showCustomCursor,
    hideCustomCursor,
    showOpen,
    hideOpen,
    moveCustomCursor,
  };
};

export default useAnimations;
