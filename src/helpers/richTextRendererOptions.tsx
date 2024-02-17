import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import React, { ReactNode } from "react";

export const richTextRendererOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => (
      <b className="font-bold double-text">{text}</b>
    ),
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => {
      const { uri } = node.data;
      return (
        <a href={uri} className="underline">
          {children}
        </a>
      );
    },
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => {
      return (
        <h2 className="md:text-left  text-2xl text-accent font-extrabold">
          {children}
        </h2>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => {
      return <p className="text-md py-2">{children}</p>;
    },
  },
} as Options;
