'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                }}
                className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            />
        </div>
    );
}
