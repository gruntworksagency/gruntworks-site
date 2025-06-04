'use client';

import { motion } from 'framer-motion';
import React, { forwardRef, ComponentProps } from 'react';

interface MotionLinkProps extends Omit<ComponentProps<'a'>, 'children' | 'href' | 'className' | 'ref'> {
  children: React.ReactNode;
  href: string;
  className?: string;
  whileHover?: object;
  whileTap?: object;
  transition?: object;
  'aria-describedby'?: string;
  id?: string;
}

const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(({
  children,
  href,
  className,
  whileHover,
  whileTap,
  transition,
  ...restProps
}, ref) => {
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
});

MotionLink.displayName = 'MotionLink';

export default MotionLink; 