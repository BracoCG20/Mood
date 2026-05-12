import { motion } from 'motion/react';

const FadeContent = ({
  children,
  className = '',
  duration = 0.5,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;
