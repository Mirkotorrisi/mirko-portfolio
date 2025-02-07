import React from "react";
import { Job } from "../../types";
import Curve from "../Curve";

interface Props {
  nodes: Job[];
}
export const Curriculum = ({ nodes }: Props) => {
  return (
    <div className="flex flex-col md:gap-8 relative pb-20">
      <div className="flex flex-col-reverse md:flex-row px-2 md:px-0">
        <Curve
          initialPath="M 0 199 L 0 199 L 0 201 L 0 201 L 0 199"
          finalPath="M 0 199 L 0 199 L 0 201 L 0 201 L 0 199"
          color="transparent"
          className="relative left-0 h-6 md:h-full [&>svg]:h-6 md:[&>svg]:h-full"
          end="bottom center"
        />
        <div className="mt-auto line">
          <h2>Experience</h2>
        </div>
      </div>
      {nodes
        .sort(
          (a, b) =>
            Number(b.period.split("-")[0]) - Number(a.period.split("-")[0])
        )
        .map(({ companyName, description, period }, i) => (
          <div
            className="flex flex-col-reverse md:flex-row px-2 md:px-0"
            key={companyName + i}
          >
            <Curve
              initialPath="M 0 196 L 0 196 L 0 204 L 0 204 L 0 196"
              finalPath="M 0 196 L 800 196 L 800 204 L 0 204 L 0 196"
              color="#343a40"
              className="relative left-0 h-12 md:h-full [&>svg]:h-12 md:[&>svg]:h-full"
              end="bottom center"
            />
            <div className="mr-auto w-full container flex-1 flex flex-col gap-2 border-l-4 border-primary px-4 py-2">
              <p className="font-bold text-highlight text-xl">@{companyName}</p>
              <p className="text-accent bg-primary flex-shrink-0">{period}</p>
              <ul>
                {description.map((d, i) => {
                  const https = "https://";
                  if (d.includes(https)) {
                    const [text, link] = d.split(https);
                    return (
                      <li key={i} className="underline hover:text-accent">
                        <a href={`https://${link}`}>{text}</a>
                      </li>
                    );
                  }
                  return <li key={i}>{d}</li>;
                })}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};
