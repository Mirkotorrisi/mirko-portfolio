import { Section } from "../types";

export const getSectionsObject = (
  sections: Section[]
): Record<string, Section> =>
  sections.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.sectionId]: curr,
    }),
    {}
  );
