import React from 'react'
import { motion } from 'framer-motion'
// import ParallaxImage from './parallaxImage';

const InfinityScroller = ({direction , bgColor , text}) => {
  // Array of scrolling items to avoid repetitive code
  const scrollItems = [
    "Developer & Designer",
    "Creative Technologist",
    "UI/UX Enthusiast",
    "Innovation Architect",
    "Digital Craftsman"
  ];

  return (
    <div className="w-full relative overflow-hidden border border-zinc-900  mt-2"  style={{ backgroundColor: `var(${bgColor})`, color: `var(${text})` }}>
      
    
      <div className="relative flex gap-5 py-1">
        {[1, 2].map((row) => (
          <motion.div
            key={row}
            className="flex items-center gap-5 shrink-0"
            initial={{ x: direction === 0 ? "0" : "-50%" }}
            animate={{ x: direction === 0 ? "-50%" : "0" }}
            transition={{
              duration: 5, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...scrollItems, ...scrollItems].map((item, index) => (
              <div 
                key={index} 
                className="text-xl  whitespace-nowrap"
                
              >
                <p className='' style={{color: `var(${text})`}}>{item}</p>
                {/* <div className="w-[10vw] h-[20vh] bg-red-500">
                  <ParallaxImage src={""} />
                </div> */}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default InfinityScroller