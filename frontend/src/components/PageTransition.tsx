import { motion } from 'framer-motion';
import React from 'react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: 50,
  },
};

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut',
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ width: '100%', flex: 1 }}
    >
      {children}
    </motion.div>
);

export default PageTransition;