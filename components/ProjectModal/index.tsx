import { IoCloseOutline } from "react-icons/io5";
import { AiFillGithub, AiOutlineShareAlt, AiOutlineLink } from "react-icons/ai";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Project } from "@/types";
import { useRef, useState } from "react";
import style from "./styles.module.css";

export const ProjectModal = ({
  show,
  setShow,
  project,
}: {
  show: boolean;
  setShow: any;
  project: Project;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const modal = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImage < project.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const handleNavigateImage = (index: number) => {
    setCurrentImage(index);
  };

  const onClose = () => {
    modal.current?.classList.add(style.modalClose);
    setTimeout(() => {
      setShow(!show);
    }, 300);
  };

  return (
    !show || (
      <div className="flex justify-center items-center fixed w-screen h-screen bg-[#00000096] top-0 bottom-0 left-0 right-0">
        <div
          className={`flex w-3/4 h-3/4 bg-white rounded-md ${style.projectModal}`}
          ref={modal}
          id="modal"
        >
          <figure className="flex-[2_1] relative">
            <img
              src={project.images[currentImage]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              id="controllers"
              className="absolute w-full h-full top-0 flex justify-between items-center px-5"
            >
              <button
                className="flex justify-center items-center bg-black text-white text-3xl p-2 w-10 h-10 leading-5 rounded-full opacity-60 hover:invert"
                onClick={() => handlePrevImage()}
              >
                <GoChevronLeft />
              </button>
              <ul className="absolute bottom-5 left-0 right-0 flex gap-5 justify-center">
                {project.images.map((image, index) => (
                  <li key={index} onClick={() => handleNavigateImage(index)}>
                    <span
                      className={`flex w-3 h-3 rounded-full border border-white cursor-pointer hover:bg-white hover:scale-125 ${
                        index === currentImage && "bg-white"
                      }`}
                      aria-label={`go to image ${index}`}
                    />
                  </li>
                ))}
              </ul>
              <button
                className="flex justify-center items-center bg-black text-white text-3xl p-2 w-10 h-10 leading-5 rounded-full opacity-60 hover:invert"
                onClick={() => handleNextImage()}
              >
                <GoChevronRight />
              </button>
            </div>
          </figure>
          <div className="flex flex-col flex-1 pt-10 px-10 overflow-y-auto">
            <IoCloseOutline
              className="select-none cursor-pointer text-2xl absolute top-7 right-7 hover:scale-110"
              onClick={() => onClose()}
            />
            <h2 className="text-5xl font-semibold">{project.title}</h2>
            <p className="text-xl flex-[4] break-words">
              {project.description}
            </p>
            <ul className="flex items-center flex-1 text-3xl gap-3 py-7">
              {!project.links.live || (
                <li>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex p-2 bg-black text-white rounded-full hover:scale-110"
                  >
                    <AiOutlineLink />
                  </a>
                </li>
              )}
              {!project.links.github || (
                <li>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex p-2 bg-black text-white rounded-full hover:scale-110"
                  >
                    <AiFillGithub />
                  </a>
                </li>
              )}
              <li>
                <a
                  href="https://www.google.com"
                  className="flex p-2 bg-black text-white rounded-full hover:scale-110"
                >
                  <AiOutlineShareAlt />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};
