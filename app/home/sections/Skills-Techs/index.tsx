import React from "react";
import styles from "./style.module.css";

import { AiFillHtml5, AiFillGithub, AiFillGitlab } from "react-icons/ai";
import { DiCss3, DiSass, DiLinux } from "react-icons/di";
import {
  BiLogoReact,
  BiLogoNodejs,
  BiLogoPhp,
  BiLogoGit,
} from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTailwindcss, SiTypescript, SiMysql } from "react-icons/si";
import { TbBrandNextjs, TbBrandCSharp, TbBrandVscode } from "react-icons/tb";
import { FaLaravel, FaTrello } from "react-icons/fa6";
import { RiNotionFill } from "react-icons/ri";

export default function Skills() {
  return (
    <section
      className={styles.listSkills + " bg-[#e5e7eb] dark:bg-[#1b1b1b] under"}
    >
      <div className="rounded-md">
        <h2>FrontEnd</h2>
        <ul>
          <li>
            <AiFillHtml5 />
          </li>
          <li>
            <DiCss3 />
          </li>
          <li>
            <IoLogoJavascript />
          </li>
          <li>
            <BiLogoReact />
          </li>
          <li>
            <TbBrandNextjs />
          </li>
          <li>
            <SiTypescript />
          </li>
          <li>
            <SiTailwindcss />
          </li>
          <li>
            <DiSass />
          </li>
        </ul>
      </div>
      <div>
        <h2>BackEnd</h2>
        <ul>
          <li>
            <BiLogoNodejs />
          </li>
          <li>
            <BiLogoPhp />
          </li>
          <li>
            <SiMysql />
          </li>
          <li>
            <FaLaravel />
          </li>
          <li>
            <TbBrandCSharp />
          </li>
        </ul>
      </div>
      <div>
        <h2>DevOps</h2>
        <ul>
          <li>
            <BiLogoGit />
          </li>
          <li>
            <AiFillGithub />
          </li>
          <li>
            <AiFillGitlab />
          </li>
          <li>
            <DiLinux />
          </li>
          <li>
            <FaTrello />
          </li>
          <li>
            <RiNotionFill />
          </li>
          <li>
            <TbBrandVscode />
          </li>
        </ul>
      </div>
    </section>
  );
}
