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
  richText: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  image?: IGatsbyImageData;
  imageDesc?: string;
  invertedOrder?: boolean;
};

const Section = ({
  title,
  richText,
  image,
  imageDesc,
  invertedOrder,
}: Props) => {
  return (
    <section className="p-8 lg:p-20 gap-8 md:grid md:grid-cols-2 md:gap-20 lg:gap-40">
      <div
        className={`flex flex-col justify-center ${
          invertedOrder ? "order-2" : ""
        }`}
      >
        <div className="line overflow-hidden relative">
          <h2 className="md:text-left absolute">{title}</h2>
        </div>
        <div className={`mt-2 lg:mt-4 md:text-left`}>
          {renderRichText(richText, richTextRendererOptions)}
        </div>
      </div>
      {image && (
        <GatsbyImage
          image={image}
          alt={imageDesc ?? ""}
          className="rounded-full"
        />
      )}
    </section>
  );
};

export default Section;
