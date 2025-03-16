"use client";
import React from 'react';
import { HyperText } from '../magicui/hyper-text';

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <HyperText className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto">
          Hello, World! Welcome To Task Scheduler Website
        </HyperText>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-600">
          Organize your tasks efficiently and boost your productivity
        </p>
      </div>
    </>
  );
};

export default Hero;