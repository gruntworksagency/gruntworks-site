'use client';

import { motion } from 'framer-motion';
import React, { ComponentProps } from 'react';

interface MotionLinkProps extends Omit<ComponentProps<'a'>, 'children' | 'href' | 'className'> {
  children: React.ReactNode;
  href: string;
  className?: string;
  whileHover?: object;
  whileTap?: object;
  transition?: object;
  ref?: React.Ref<HTMLAnchorElement>;
  'aria-describedby'?: string;
  id?: string;
}

const MotionLink: React.FC<MotionLinkProps> = ({
  children,
  href,
  className,
  whileHover,
  whileTap,
  transition,
  ref,
  ...restProps
}) => {
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      {...restProps}
    >
      {children}
    </motion.a>
  );
};

export default MotionLink; 