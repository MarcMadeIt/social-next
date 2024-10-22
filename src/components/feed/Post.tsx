import Image from "next/image";
import React from "react";
import {
  FaArrowUpRightFromSquare,
  FaPaw,
  FaRegCommentDots,
  FaShareFromSquare,
} from "react-icons/fa6";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="min-h-44 bg-foreground shadow-lg rounded-xl p-3 gap-4 flex flex-col justify-between">
      {/* Header*/}
      <div className="flex justify-between text-primary">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 md:w-7 md:h-7 relative">
            <Image
              src="/cat2.jpg"
              alt=""
              className="object-cover rounded-md"
              fill
            />
          </div>
          <span className="font-medium text13 md:text-base">Mayse</span>
          <p className="text12 text-extra py-1 px-2 bg-user rounded-md font-semibold cursor-pointer">
            <span className="text-lg leading-3">@</span>Mayse7
          </p>
        </div>
        <div className="flex items-center gap-3 text13 cursor-pointer ">
          <span>Join & View </span>
          <FaArrowUpRightFromSquare size={15} />
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center gap-4">
        <div className="w-full h-52 md:min-h-96  relative">
          <Image
            src="/cat5.jpg"
            alt=""
            className="object-cover rounded-lg "
            fill
          />
        </div>
        <p className="text12 text-text">
          Spite industrial official spring ranch search rough list dozen tree
          clay which building tone courage sang sister children nuts drove
          accident eye liquid chain
        </p>
      </div>
      {/* Details */}
      <div className="flex flex-col justify-between">
        {/* Interactives */}
        <div className="flex text13 gap-6 text-primary">
          <div className="flex items-center gap-1 cursor-pointer ">
            <span className="font-medium">31</span>
            <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
            <FaPaw />
            <span>Paw</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer ">
            <span className="font-medium">6</span>
            <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
            <FaRegCommentDots />
            <span>Comment</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer ">
            <span className="font-medium">2</span>
            <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
            <FaShareFromSquare />
            <span>Share</span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
