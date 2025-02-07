import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
  renderRichText,
} from "gatsby-source-contentful/rich-text";
import React from "react";
import { richTextRendererOptions } from "../../helpers/richTextRendererOptions";
import Github from "../icons/Github";

type Props = {
  title: string;
  image: IGatsbyImageData;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  link: string;
  showOpen: () => void;
  hideOpen: () => void;
};
const WorksCard = ({
  title,
  image,
  description,
  link,
  showOpen,
  hideOpen,
}: Props) => {
  return (
    <div className="relative shrink-0 h-[calc(100vh-5rem)] lg:h-full">
      <div className="bg-white border-2 shadow-accent rounded-lg overflow-hidden p-4 lg:p-8 flex flex-col gap-4 h-full  max-w-[100vw]">
        <div className="w-full flex justify-between items-start z-30">
          <h3 className="font-bold text-4xl w-[80%]">{title}</h3>{" "}
          <a
            className="underline text-lg font-bold hover:!cursor-pointer"
            href={link}
            target="_blank"
            aria-label="Github repository"
            onMouseEnter={showOpen}
            onMouseLeave={hideOpen}
          >
            <Github fill="#000000" />
          </a>
        </div>
        {image && (
          <GatsbyImage
            image={image}
            alt={""}
            className="z-0 absolute lg:relative top-0 left-0  lg:rounded-xl h-full after:rounded-lg  after:absolute after:z-10 after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-b after:from-white after:to-white/80 lg:after:bg-none lg:h-48 lg:max-w-xs  w-full"
          />
        )}
        <div className={`mt-2 lg:mt-4 md:text-left z-30 `}>
          {renderRichText(description, richTextRendererOptions)}
        </div>
      </div>
    </div>
  );
};

export default WorksCard;
