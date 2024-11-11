// components/SlideMenu.js
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const SlideMenu = ({
  isOpen,
  onClose,
  children,
  slideFrom = "right",
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  slideFrom?: "left" | "right";
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Set slide direction based on the slideFrom prop
  const initialX = slideFrom === "left" ? "-100%" : "100%";
  const exitX = slideFrom === "left" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              background: "rgba(0, 0, 0, 0.3)", // dark overlay
              zIndex: 10,
            }}
            onClick={onClose} // Close when clicking on overlay
          />

          {/* Sliding menu */}
          <motion.div
            key="menu"
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: exitX }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              [slideFrom]: 0, // Align the menu to the specified side
              height: "100%",
              width: "100%", // Adjust width as desired for the menu
              maxWidth: "400px", // Optional: set a max width for the slide menu
              background: "#fff", // Menu background color
              zIndex: 11,
              color: "#000",
              overflowY: "auto",
            }}>
            <button
              onClick={onClose}
              className="sticky top-0 flex w-full items-center bg-[#F6FE9B] px-8 py-4 text-black">
              <FaArrowLeft className="mr-2" /> Back
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideMenu;
