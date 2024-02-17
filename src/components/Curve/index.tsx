import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

type Props = {
  initialPath: string;
  finalPath: string;
  color: string;
  className: string;
  start?: string;
  end?: string;
};

const Curve = ({
  className,
  finalPath,
  initialPath,
  color,
  start,
  end,
}: Props) => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: start ?? "top bottom",
            end: end ?? "bottom top",
            scrub: 1,
          },
        })
        .to('[vb-element="path-to-animate"]', {
          attr: { d: finalPath },
          ease: "none",
        });
    },
    { scope: container }
  );

  return (
    <div className={className} ref={container}>
      <svg
        className="w-full h-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          vb-element="path-to-animate"
          d={initialPath}
          fill={color}
          stroke={color}
        />
      </svg>
    </div>
  );
};

export default Curve;
