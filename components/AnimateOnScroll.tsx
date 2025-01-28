'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import React from 'react';

type AnimateOnScrollProps = {
    children: React.ReactNode;
    className?: string;
};

export default function AnimateOnScroll({ children, className }: AnimateOnScrollProps) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
