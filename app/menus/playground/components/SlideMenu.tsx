// components/SlideMenu.js
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const SlideMenu = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, 0.3)", // dark overlay
            zIndex: 1000,
            color: "#fff",
            overflowY: "auto",
          }}>
          <button
            onClick={onClose}
            className="flex w-full max-w-xl items-center bg-[#F6FE9B] px-8 pt-4 text-black">
            <FaArrowLeft className="mr-2" /> Back
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideMenu;
