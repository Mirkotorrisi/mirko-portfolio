import { useGSAP } from "@gsap/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
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
  image: IGatsbyImageData;
}

const TitleLetters = ({ title }: { title: string }) => (
  <div className="flex">
    {title?.split("").map((l, i) => (
      <span key={i + l}>{l}</span>
    ))}
  </div>
);

export const Hero = ({ title, richText, image }: Props) => {
  const container = useRef(null);
  useGSAP(
    () => {
      const letters = gsap.utils.toArray("header h1 span");
      gsap.to(letters, {
        rotateY: "0deg",
        stagger: 0.05,
        delay: 0.5,
      });
    },
    { scope: container }
  );
  return (
    <header className="relative w-full h-screen bg-primary flex justify-center">
      <div
        className="flex flex-col h-full justify-center px-4 lg:px-20 z-10"
        ref={container}
      >
        <h1 className="text-3xl lg:text-6xl text-highlight">
          <TitleLetters title={title} />
        </h1>
        <h4 className="text-xl text-accent">{renderRichText(richText)}</h4>
      </div>
      <GatsbyImage
        image={image}
        alt="hero-image"
        className="absolute right-0 bottom-0 h-96 w-96 object-cover  z-0 m-auto"
      />
      <Octahedron />
    </header>
  );
};
