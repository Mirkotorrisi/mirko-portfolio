import { useGSAP } from "@gsap/react";
import { graphql, type HeadFC } from "gatsby";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import * as React from "react";
import { formConfig } from "../assets/form.config";
import { Curriculum } from "../components/Curriculum";
import Curve from "../components/Curve";
import Form from "../components/Form";
import { Hero } from "../components/Hero";
import Section from "../components/Section";
import Works from "../components/Works";
import { getSectionsObject } from "../helpers";
import { submitForm } from "../services/formService";
import { PageData } from "../types";
interface Props {
  data: PageData;
}

const IndexPage: React.FC<Props> = ({
  data: { allContentfulCurriculum, allContentfulSections, allContentfulWork },
}) => {
  const sections = getSectionsObject(allContentfulSections.nodes);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch(".double-text", {
      interval: 0.5,
      batchMax: 4,
      start: "top 80%",

      onEnter: (batch) => {
        gsap.to(batch, {
          backgroundSize: "100% 100%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.25,
        });
      },
    });

    ScrollTrigger.batch(".line h2", {
      interval: 0.5,
      batchMax: 4,
      start: "bottom bottom",
      once: true,

      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          {
            skewY: 7,
            y: 100,
            once: true,
          },
          {
            skewY: 0,
            y: 0,
            ease: "power4.out",
            stagger: {
              amount: 0.5,
            },
            once: true,
          }
        );
      },
    });
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await submitForm(e.target as HTMLFormElement);
  };

  return (
    <main className="bg-background flex flex-col justify-center items-center">
      <Hero
        title={sections["hero"].title}
        richText={sections["hero"].paragraph}
        image={sections["hero"].image.gatsbyImageData}
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
      <Works cards={allContentfulWork.nodes} />
      <div className="line overflow-hidden relative my-4">
        <h2 className={`heading-2 text-center`}>Let's get in touch</h2>
      </div>
      <Form
        handleSubmit={handleSubmit}
        formConfig={formConfig}
        submitLabel="Contact me!"
        formClassNames={{
          container: "container grid grid-cols-2 gap-4 mx-auto p-8",
          input: "border-accent rounded-lg border px-4 py-2 h-full w-full",
          submit:
            "col-span-2 mx-auto rounded-lg border border-accent bg-slate-200 hover:bg-accent hover:text-white hover:cursor-pointer font-bold px-8 py-2 hover:cursor-pointer",
          message: "col-span-2 h-48",
        }}
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
      }
    }
  }
`;
