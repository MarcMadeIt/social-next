import React from "react";
import Link from "next/link";

interface Props {
    show: boolean;
    onClose: () => void;
  }

  const OptionsModal = ({ show, onClose }: Props) => {
    if (!show) {
      return null;
    }

  return (
  
    <div
      className={`absolute -top-[170px] right-0 z-60 ${show ? "show" : ""} md:top-12 md:-right-7 md:p-3 rounded-b-xl`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className=" flex flex-col gap-3 text-center cursor-default">
        <Link
          className=" border-2 border-primary rounded-xl px-5 py-2 bg-background hover:border-secondary hover:text-secondary transition-colors duration-300"
          href="/petcare"
          onClick={onClose}
        >
          <span>PetCare</span>
        </Link>

        <Link
          className=" border-2 border-primary rounded-xl px-5 py-2 bg-background hover:border-secondary hover:text-secondary transition-colors duration-300"
       
          href="/petfriend"
          onClick={onClose}
        >
          <span>PetFriend</span>
        </Link>

        <Link
          className=" border-2 border-primary rounded-xl px-5 py-2 bg-background hover:border-secondary hover:text-secondary transition-colors duration-300"
        
          href="/petmatch"
          onClick={onClose}
        >
          <span>PetMatch</span>
        </Link>
      </div>
    </div>
    
  );
}

export default OptionsModal;
