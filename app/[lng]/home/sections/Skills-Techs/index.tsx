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
      className={styles.listSkills + " bg-[#e5e7eb] dark:bg-[#1b1b1b] gap-16"}
    >
      <article>
        <h2>FrontEnd</h2>
        <ul>
          <li>
            <AiFillHtml5 arial-label="HTML5" />
          </li>
          <li>
            <DiCss3 arial-label="CSS3" />
          </li>
          <li>
            <IoLogoJavascript arial-label="JavaScript" />
          </li>
          <li>
            <BiLogoReact arial-label="React" />
          </li>
          <li>
            <TbBrandNextjs arial-label="NextJS" />
          </li>
          <li>
            <SiTypescript arial-label="TypeScript" />
          </li>
          <li>
            <SiTailwindcss arial-label="TailWindCSS" />
          </li>
          <li>
            <DiSass arial-label="SASS" />
          </li>
        </ul>
      </article>
      <article>
        <h2>BackEnd</h2>
        <ul>
          <li>
            <BiLogoNodejs arial-label="NodeJS" />
          </li>
          <li>
            <BiLogoPhp arial-label="PHP" />
          </li>
          <li>
            <SiMysql arial-label="MySQL" />
          </li>
          <li>
            <FaLaravel arial-label="Laravel" />
          </li>
          <li>
            <TbBrandCSharp arial-label="CSharp" />
          </li>
        </ul>
      </article>
      <article>
        <h2>DevOps</h2>
        <ul>
          <li>
            <BiLogoGit arial-label="Git" />
          </li>
          <li>
            <AiFillGithub arial-label="GitHub" />
          </li>
          <li>
            <AiFillGitlab arial-label="GitLab" />
          </li>
          <li>
            <DiLinux arial-label="Linux" />
          </li>
          <li>
            <FaTrello arial-label="Trello" />
          </li>
          <li>
            <RiNotionFill arial-label="Notion" />
          </li>
          <li>
            <TbBrandVscode arial-label="Visual Studio Code" />
          </li>
        </ul>
      </article>
    </section>
  );
}
