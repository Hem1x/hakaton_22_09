import React from 'react';
import { motion } from 'framer-motion';

const TransitionEffect = ({ children }) => {
  const duration = 1;
  const ease = 'easeInOut';

  return (
    <>
      <motion.div
        className="h-full flex justify-center align-middle items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          duration,
          ease,
        }}>
        {children}
      </motion.div>
    </>
  );
};

export default TransitionEffect;
