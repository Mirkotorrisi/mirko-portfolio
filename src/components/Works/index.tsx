import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { Work } from "../../types";
import WorksCard from "../WorksCard";

type Props = {
  cards: Work[];
  showOpen: () => void;
  hideOpen: () => void;
};
const Works = ({ cards, showOpen, hideOpen }: Props) => {
  const container = useRef(null);
  const scrollableSection = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const getScrollAmount = () => {
        if (!scrollableSection.current) return 0;
        return -(scrollableSection.current.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollableSection.current, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: ".scrollWrapper",
        start: "top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    },
    {
      scope: container,
    }
  );

  return (
    <div className="w-full bg-primary pb-20" ref={container}>
      <div className="scrollWrapper flex flex-col relative w-full max-w-[100vw]">
        <div className="px-8 lg:px-20 line lg:pb-20">
          <h2 className="text-white">Works</h2>
        </div>
        <div className="my-4" />
        <div
          className="races flex gap-4 lg:gap-8 px-8 lg:px-20"
          ref={scrollableSection}
        >
          {cards.map((c) => (
            <WorksCard
              title={c.title}
              description={c.description}
              key={c.title}
              image={c.image?.gatsbyImageData}
              link={c.link}
              showOpen={showOpen}
              hideOpen={hideOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
