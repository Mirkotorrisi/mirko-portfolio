import { graphql, type HeadFC } from "gatsby";
import * as React from "react";
import { formConfig } from "../assets/form.config";
import { Curriculum } from "../components/Curriculum";
import Curve from "../components/Curve";
import CustomPointer from "../components/CustomPointer";
import Footer from "../components/Footer";
import Form from "../components/Form";
import { Hero } from "../components/Hero";
import Section from "../components/Section";
import Works from "../components/Works";
import { getSectionsObject } from "../helpers";
import useAnimations from "../hooks/useAnimations";
import { submitForm } from "../services/formService";
import { PageData } from "../types";
interface Props {
  data: PageData;
}

const IndexPage: React.FC<Props> = ({
  data: {
    allContentfulCurriculum,
    allContentfulSections,
    allContentfulWork,
    allContentfulContact,
  },
}) => {
  const sections = getSectionsObject(allContentfulSections.nodes);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await submitForm(e.target as HTMLFormElement);
  };

  const {
    container,
    showCustomCursor,
    hideCustomCursor,
    moveCustomCursor,
    showOpen,
    hideOpen,
  } = useAnimations();

  return (
    <main
      className="bg-background flex flex-col justify-center items-center cursor-none"
      ref={container}
      onMouseEnter={showCustomCursor}
      onMouseLeave={hideCustomCursor}
      onMouseMove={moveCustomCursor}
    >
      <CustomPointer />
      <Hero
        title={sections["hero"].title}
        richText={sections["hero"].paragraph}
      />
      <div className="relative bg-background w-full py-80">
        <Curve
          initialPath="M 800 300 Q 0 350 0 300 L 0 0 L 800 0 L 800 300 Z"
          finalPath="M 800 300 Q 800 0 0 0 L 0 0 L 800 0 L 800 300 Z"
          color="#343a40"
          className="absolute w-full top-0 h-96"
        />
        <Section
          title={sections["this-is-myself"].title}
          richText={sections["this-is-myself"].paragraph}
          image={sections["this-is-myself"].image.gatsbyImageData}
        />

        <Curriculum nodes={allContentfulCurriculum.nodes} />
        <Curve
          initialPath="M 0 0 Q 0 400 800 400 L 800 400 L 800 400 L 0 400 Z"
          finalPath="M 0 0 Q 0 0 0 0 L 800 0 L 800 400  L 0 400 Q 0 0 0 0  Z"
          color="#343a40"
          className="absolute w-full bottom-0 h-96"
        />
      </div>
      <Works
        cards={allContentfulWork.nodes}
        showOpen={showOpen}
        hideOpen={hideOpen}
      />
      <div className="line overflow-hidden relative my-4">
        <h2 className={`text-center`}>Let's get in touch</h2>
      </div>
      <Form
        handleSubmit={handleSubmit}
        formConfig={formConfig}
        submitLabel="Contact me!"
        formClassNames={{
          container: "container grid grid-cols-2 gap-4 mx-auto p-8",
          input: "rounded-lg border px-4 py-2 h-full w-full",
          submit:
            "rounded-lg border-2 border-accent bg-accent hover:bg-white  font-bold px-8 py-2 hover:cursor-pointer",
          message: "col-span-2 h-48",
          submitContainer: "col-span-2 flex justify-center gap-2 items-center",
          thankYouMsg: "col-span-2 text-center font-bold mx-auto",
        }}
        thankYouMsg="Thank you for reaching out! I'll get back to you as soon as possible."
      />
      <Footer
        contacts={allContentfulContact.nodes}
        showOpen={showOpen}
        hideOpen={hideOpen}
      />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Mirko Torrisi - A Web Developer Portfolio</title>
);

export const data = graphql`
  query contentQuery {
    allContentfulCurriculum {
      nodes {
        companyName
        description
        period
      }
    }
    allContentfulSections(filter: { pageId: { eq: "home" } }) {
      nodes {
        image {
          gatsbyImageData
        }
        title
        paragraph {
          raw
        }
        sectionId
      }
    }
    allContentfulWork {
      nodes {
        title
        link
        description {
          raw
        }
        image {
          gatsbyImageData
        }
      }
    }
    allContentfulContact {
      nodes {
        linkTo
        name
      }
    }
  }
`;
