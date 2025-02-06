import React from "react";
import { Contact } from "../../types";
import Email from "../icons/Email";
import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";

type Props = {
  contacts: Contact[];
};

const imgList = {
  Linkedin: <Linkedin />,
  Github: <Github />,
  Email: <Email />,
};

const Footer = ({ contacts }: Props) => {
  return (
    <footer className="w-full h-20 bg-primary flex items-center justify-center gap-4 px-6 lg:px-12">
      {contacts.map((contact) => (
        <a
          key={contact.name}
          href={contact.linkTo}
          target="_blank"
          rel="noreferrer"
          aria-label={`Link to my ${contact.name}`}
          className="flex items-center gap-2"
        >
          {imgList[contact.name as keyof typeof imgList]}
        </a>
      ))}
    </footer>
  );
};

export default Footer;
