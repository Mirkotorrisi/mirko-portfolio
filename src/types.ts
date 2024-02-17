import { IGatsbyImageData } from "gatsby-plugin-image";
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from "gatsby-source-contentful/rich-text";

export type Job = {
  companyName: string;
  description: string[];
  period: string;
};
export type Work = {
  title: string;
  link: string;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  image: {
    gatsbyImageData: IGatsbyImageData;
  };
};

export type Section = {
  image: {
    gatsbyImageData: IGatsbyImageData;
  };
  title: string;
  paragraph: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  sectionId: string;
};

export type PageData = {
  allContentfulSections: {
    nodes: Section[];
  };
  allContentfulCurriculum: {
    nodes: Job[];
  };
  allContentfulWork: {
    nodes: Work[];
  };
};
