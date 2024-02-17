import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
  renderRichText,
} from "gatsby-source-contentful/rich-text";
import React from "react";
import Octahedron from "../Octahedron";

interface Props {
  title: string;
  richText: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  image: IGatsbyImageData;
}

export const Hero = ({ title, richText, image }: Props) => {
  const img = getImage(image);
  return (
    <header className="relative w-full h-screen bg-primary flex justify-between">
      <div className="flex flex-col h-full justify-center px-4 lg:px-20">
        <h1 className="text-6xl text-highlight">{title}</h1>
        <h4 className="text-xl text-accent">{renderRichText(richText)}</h4>
      </div>
      {img && (
        <GatsbyImage
          image={img}
          alt="hero-image"
          className="rounded-full h-96 w-96 object-cover m-auto"
        />
      )}
      <Octahedron />
    </header>
  );
};
