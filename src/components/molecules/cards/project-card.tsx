import type {IProjectCard} from "./project-card.d";

import React from "react";
import {Heart, HeartOff} from "lucide-react";

import {useProjectLikedStore} from "../../../services/storage/liked-projects";

export function ProjectCard({key, name, logoURL, primaryColor}: IProjectCard) {
  const {addLikedProject, checkLikedProject, removeLikedProject} = useProjectLikedStore();

  const isLiked = checkLikedProject(key);
  const handleClickHeart = () => {
    if (isLiked) {
      removeLikedProject(key);
    } else {
      addLikedProject(key);
    }
  };

  return (
    <article className="flex h-[35rem] w-[30rem]">
      <p
        className="grid size-full grid-cols-2 grid-rows-[auto_1fr_auto] rounded-3xl transition-transform hover:-translate-y-4"
        style={{backgroundColor: primaryColor}}
      >
        <h3 className="text-4xl font-bold tracking-tight text-white">{name}</h3>
        <img alt={`${key} Logo`} className="w-40" src={logoURL} />
        <p className="col-span-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repellat eos dolor
          deserunt optio modi dicta ut animi laborum accusantium, praesentium recusandae quibusdam,
          in aspernatur. Unde debitis eius facere nam.
        </p>
        <div className="col-span-2 flex justify-between px-5 py-6">
          <h4>Full-Stack</h4>
          <button type="button">
            {isLiked ? (
              <HeartOff className="text-red-500" onClick={handleClickHeart} />
            ) : (
              <Heart className="text-red-500" onClick={handleClickHeart} />
            )}
          </button>
        </div>
      </p>
    </article>
  );
}
