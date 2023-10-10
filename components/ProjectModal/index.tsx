import { IoCloseOutline } from "react-icons/io5";

export const ProjectModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: any;
}) => {
  return (
    !show || (
      <div className="flex justify-center items-center fixed w-screen h-screen bg-[#00000096] top-0 bottom-0 left-0 right-0">
        <div className="flex w-3/4 h-3/4 bg-white rounded-md ">
          <figure className="flex-[2_1]">
            <img src="" alt="" />
          </figure>
          <div className="flex-1 relative py-16 px-10 overflow-y-auto">
            <IoCloseOutline
              className="absolute top-7 right-7 select-none cursor-pointer text-2xl"
              onClick={() => setShow(!show)}
            />
            <h2 className="text-5xl font-semibold">Titulo Proyecto</h2>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              iaculis dui ex, eu ultrices purus tristique eget. Proin placerat
              auctor quam, eu tristique leo vulputate vitae. Maecenas tristique,
              ipsum eu feugiat varius, lectus dolor tempus augue, quis aliquam
              lorem nulla id ipsum. Nulla molestie blandit dapibus. Etiam in
              elit quis odio egestas tristique vitae vel massa. In hac habitasse
              platea dictumst.Etiam in elit quis odio egestas tristique vitae
              vel massa. In hac habitasse platea dictumst.Etiam in elit quis
              odio egestas tristique vitae vel massa. In hac habitasse platea
              dictumst.Etiam in elit quis odio egestas tristique vitae vel
              massa. In hac habitasse platea dictumst.Etiam in elit quis odio
              egestas tristique vitae vel massa. In hac habitasse platea
              dictumst.
            </p>
            <ul className="absolute bottom-10">
              <li>Link</li>
              <li>Link</li>
              <li>Link</li>
              <li>Compartir</li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};
