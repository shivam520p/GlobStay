import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    if (animationContainer.current) {
      const animation = Lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/successanimation.json",
      });
      return () => animation.destroy();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 w-[80%] lg:w-[20%] rounded-lg">
        <div className="flex items-center flex-col">
          <div ref={animationContainer} className="w-36 h-36"></div>
          <h2 className="2xl font-semibold mt-3">Success</h2>
          <p className="my-3">We will contact You Soon!</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;