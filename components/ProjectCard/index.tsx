"use client";

import Image from "next/image";
import { useState } from "react";
import { ProjectModal } from "../ProjectModal";
import { Project } from "@/types";

type Props = {
  ProjectInfo: Project;
};

export const ProjectCard = ({ ProjectInfo }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleProject = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <article
        className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
        onClick={() => handleProject()}
        key={1}
      >
        <Image
          src="/img/example-project.webp"
          width={512}
          height={512}
          alt="Example"
        />
      </article>
      <ProjectModal
        show={showModal}
        setShow={setShowModal}
        project={ProjectInfo}
      />
    </>
  );
};
