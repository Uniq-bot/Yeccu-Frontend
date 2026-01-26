import React from "react";
import { motion } from "framer-motion";

function ScrollIcon() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
    >
      <div className="flex flex-col items-center">
        {/* Arrow */}
        <motion.span 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white text-2xl"
        >
          ⌄
        </motion.span>
        {/* Optional Text */}
        <p className="text-white text-sm mt-2">Scroll down</p>
      </div>
    </motion.div>
  );
}

export default ScrollIcon;
