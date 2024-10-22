import Image from "next/image";
import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaPaw, FaRegCommentDots, FaRegFaceGrinBeam } from "react-icons/fa6";

const Comments = () => {
  return (
    <div>
      {/* Commet field  */}
      <div className="text12 px-2 pb-2 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-primary text13 cursor-pointer ">
            Limba
          </span>
          <p className="text12 text-extra py-1 px-2 bg-user rounded-md font-semibold cursor-pointer ">
            <span className="text-lg leading-3 cursor-pointer ">@</span>
            LimbaTheKing
          </p>
        </div>
        <p className="text-text">
          Fun small lunch word belong proud power ocean wood then number touch.{" "}
        </p>
        <div className="flex text12 gap-6 text-primary">
          <div className="flex items-center gap-1 cursor-pointer ">
            <span className="font-medium">2</span>
            <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
            <FaPaw />
            <span>Paw</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaRegCommentDots />
            <span>Reply</span>
          </div>
        </div>
        <span className="text13 text-extra cursor-pointer">
          Show all comments
        </span>
      </div>

      {/* Write field  */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-5 h-5 relative">
          <Image
            src="/cat.jpg"
            alt=""
            fill
            className=" rounded-md object-cover"
          />
        </div>
        <div className="relative bg-background rounded-lg w-[75%]">
          <input
            className=" bg-transparent text13 placeholder-placeholder p-2 border-none outline-none "
            placeholder="Write a comment..."
            name=""
            id=""
          />
          <FaRegFaceGrinBeam
            className="text-extra absolute right-2 bottom-2 cursor-pointer"
            size={18}
          />
        </div>
        <FaRegArrowAltCircleRight
          className="text-primary cursor-pointer "
          size={22}
        />
      </div>
    </div>
  );
};

export default Comments;
