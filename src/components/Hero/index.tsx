import { useGSAP } from "@gsap/react";
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
  renderRichText,
} from "gatsby-source-contentful/rich-text";
import gsap from "gsap";
import React, { useRef } from "react";
import Octahedron from "../Octahedron";
import "./index.scss";

interface Props {
  title: string;
  richText: RenderRichTextData<ContentfulRichTextGatsbyReference>;
}

const TitleLetters = ({ title }: { title: string }) => (
  <div className="flex">
    {title?.split("").map((l, i) => (
      <span key={i + l}>{l}</span>
    ))}
  </div>
);

export const Hero = ({ title, richText }: Props) => {
  const container = useRef(null);
  useGSAP(
    () => {
      const letters = gsap.utils.toArray("header h1 span");
      gsap.to(letters, {
        rotateY: "0deg",
        stagger: 0.025,
        delay: 0.5,
        y: 0,
      });
    },
    { scope: container }
  );

  return (
    <header className="relative w-full h-screen  flex flex-col lg:flex-row justify-center bg-primary">
      <div
        className="flex flex-col h-full justify-center px-4 lg:px-20 z-10"
        ref={container}
      >
        <h1 className="text-3xl lg:text-6xl text-highlight">
          <TitleLetters title={title} />
        </h1>
        <h4 className="text-xl text-accent">{renderRichText(richText)}</h4>
      </div>
      <Octahedron />
    </header>
  );
};
