import React from "react";
import Link from "next/link";
import { SiGithub, SiLinktree, SiLinkedin } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="w-full h-[40vh] flex flex-col justify-around items-center border-t-2 border-zinc-600 dark:border-zinc-800 pt-7">
      <div className="flex justify-around items-center w-1/2 text-4xl">
        <Link href="https://github.com/jorgepeniaranda" target="_blank">
          <SiGithub className="hover:scale-125" />
        </Link>
        <Link href="https://linktr.ee/jorgepeniaranda" target="_blank">
          <SiLinktree className="hover:scale-125" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/JorgePeniaranda/"
          target="_blank"
        >
          <SiLinkedin className="hover:scale-125" />
        </Link>
      </div>
      <span>
        Power by{" "}
        <Link
          href="mailto:contact@jorgepeniaranda.me"
          className="underline underline-offset-2 hover:brightness-75"
        >
          Jorge Peñaranda
        </Link>
      </span>
    </footer>
  );
};
