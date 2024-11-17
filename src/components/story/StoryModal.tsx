"use client";

import React from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const StoryModal = ({ isOpen, onClose, imageSrc }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 cursor-pointer"
      onClick={onClose}
    >
      <div className="relative rounded-lg shadow-lg w-[95%] md:w-auto">
        <button
          className="absolute top-5 right-5 md:-top-10 md:-right-10 text-3xl font-bold md:text-primary text-background hover:text-placeholder"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <Image
          className="rounded-lg"
          src={imageSrc}
          alt="Story"
          width={500}
          height={400}
        />
      </div>
    </div>
  );
};

export default StoryModal;
