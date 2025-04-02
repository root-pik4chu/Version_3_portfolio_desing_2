import React, { useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const InfinityScrollerWithParallax = ({ direction = 0, bgColor = "--color-bg", text = "--color-text" }) => {
  const marqueeRef = useRef(null);
  const imagesRef = useRef([]);
  const progressRef = useRef(0);
  
  // Array of image data
  const projectItems = [
    {
      title: "Mountain Landscapes",
      description: "Exploring majestic mountain ranges",
      imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "Urban Photography",
      description: "The beauty of city architecture",
      imageUrl: "https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      title: "Forest Exploration",
      description: "Wandering through ancient woodlands",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "Coastal Adventures",
      description: "Documenting seaside landscapes",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];
  
  // Constants for parallax effect
  const parallaxSpeed = 70; // Higher = more movement
  const parallaxMultiplier = 0.7; // Controls relative movement of each item
  
  // Use animation frame to animate the parallax effect
  useAnimationFrame((time) => {
    if (!marqueeRef.current) return;
    
    // Calculate progress based on time
    progressRef.current = (time * 0.0005) % 1;
    
    // Get the current position of the marquee to simulate scroll position
    const marqueeElement = marqueeRef.current;
    const transform = window.getComputedStyle(marqueeElement).transform;
    const matrix = new DOMMatrix(transform);
    const currentTranslateX = matrix.m41; // extract X translation
    
    // Apply parallax effect to each image
    imagesRef.current.forEach((img, index) => {
      if (!img) return;
      
      // Calculate parallax position based on image index and current animation progress
      // This creates opposing movement to the marquee direction
      const imagePosition = index * parallaxMultiplier;
      
      // Calculate X position - move right as marquee moves left (opposite direction)
      // Use both the marquee's current position and a time-based oscillation
      const currentScrollRatio = -currentTranslateX / (window.innerWidth * 0.5);
      const oscillation = Math.sin(progressRef.current * Math.PI * 2 + imagePosition) * 15;
      
      // Combine the effects for a rich parallax movement
      const parallaxX = (imagePosition - (currentScrollRatio % 1)) * parallaxSpeed + oscillation;
      
      // Apply the transform
      img.style.transform = `translateX(${parallaxX}px)`;
    });
  });

  return (
    <div 
      className="w-full relative overflow-hidden border border-zinc-900 mt-2"
      style={{ backgroundColor: `var(${bgColor})`, color: `var(${text})` }}
    >
      <div className="relative flex gap-5 py-4">
        {[1, 2].map((row) => (
          <motion.div
            key={row}
            ref={marqueeRef}
            className="flex items-center gap-5 shrink-0"
            initial={{ x: direction === 0 ? "0" : "-50%" }}
            animate={{ x: direction === 0 ? "-50%" : "0" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...projectItems, ...projectItems].map((item, index) => {
              const uniqueKey = `${row}-${index}`;
              
              return (
                <div
                  key={uniqueKey}
                  className="relative flex flex-col w-[280px]"
                >
                  <div className="h-[10vh] p-4">
                    <h1 className="font-semibold mb-2" style={{color: `var(${text})`}}>
                      {item.title}
                    </h1>
                    <p className="text-sm" style={{color: `var(${text})`}}>
                      {item.description}
                    </p>
                  </div>
                  <div className="h-[40vh] overflow-hidden relative">
                    <div 
                      ref={(el) => (imagesRef.current[index + (row-1) * projectItems.length * 2] = el)}
                      className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                      style={{ 
                        backgroundImage: `url(${item.imageUrl})`,
                        willChange: 'transform',
                        transformOrigin: 'center',
                        transition: 'transform 0.05s ease-out' // Smooth movement
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfinityScrollerWithParallax;