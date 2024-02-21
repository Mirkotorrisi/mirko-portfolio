import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
  renderRichText,
} from "gatsby-source-contentful/rich-text";
import React from "react";
import { richTextRendererOptions } from "../../helpers/richTextRendererOptions";

type Props = {
  title: string;
  image: IGatsbyImageData;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  link: string;
};
const WorksCard = ({ title, image, description, link }: Props) => {
  return (
    <a href={link} target="_blank" className="shrink-0 h-full ">
      <div className="bg-white border-2 border-accent rounded-lg p-4 lg:p-8 flex flex-col gap-8 h-full">
        <h3 className="font-bold text-4xl">{title}</h3>
        {image && (
          <GatsbyImage
            image={image}
            alt={""}
            className="rounded-3xl h-48 max-w-xs border-2 border-accent"
          />
        )}
        <div className={`mt-2 lg:mt-4 md:text-left`}>
          {renderRichText(description, richTextRendererOptions)}
        </div>
      </div>
    </a>
  );
};

export default WorksCard;
