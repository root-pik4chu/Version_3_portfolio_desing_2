import React, { useEffect, useRef } from "react";
import HoverBox from "../HoverBox";
import InfiniteMarquee from "../Components/InfiniteMarquee";
import { motion } from "framer-motion";

function Home() {
  // Variants for parent container animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  // Variants for each word
  const wordVariants = {
    hidden: { 
      y: "130%", 
     
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 2.2,
        ease: [0.85, 0, 0.15, 1] // custom easing (cubic-bezier)
      }
    }
  };

  // Function to split text into motion components with precise coloring
  const SplitText = ({ text, className }) => {
    // Split the text into individual words
    const words = text.split(" ");
    
    return (
      <motion.div 
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => {
          // Check for specific words to highlight
          const isNamePart = (word === "Sahil" || word === "Saundale" || word === "Saundale.");
          const isDevPart = (word === "Front" || word === "End" || word === "Developer");
          const shouldHighlight = isNamePart || isDevPart;
          
          return (
            <span key={index} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
              <motion.span
                style={{ 
                  display: "inline-block",
                  color: shouldHighlight ? "rgb(255, 80, 10)" : "inherit", 
                 
                  overflow: "hidden",
                  height: "fit"
                }}
                variants={wordVariants}
                
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="w-full flex items-center justify-center bg-zinc-50 text-zinc-800">
      <div className="w-[95%] h-[90vh]">
        <div className="w-full h-[20vh] flex items-start flex-col overflow-hidden ">
          <h1 className="text-[4vw] leading-none ">
            <SplitText 
              text="My Name is Sahil Saundale. I'm a Front End Developer" 
              className="tracking-tight"
            />
            
            <div className="w-full  flex overflow-hidden ">
            <h1 className="text-[4vw] leading-none ">
            <SplitText 
                text="based in Maharashtra" 
                className="flex tracking-tight"
              />
            </h1>
              
              
              <div className="root text-2xl h-fit">
                <div className="flex items-center justify-center mt-[2vw] mx-[2vw] px-[2vw] py-[0.3vw] text-[1vw] border-zinc-300 border-1 rounded-[2vw] overflow-hidden">
                <motion.span
                  className=""
                  style={{ color: "#18181b" }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 1.8, 
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                >
                  sahilsaundale@gmail.com
                </motion.span>
                </div>
                
              </div>
            </div>
          </h1>
        </div>
        <div className="h-[69vh] w-[90%] fixed">
          {/* <HoverBox /> */}
          <InfiniteMarquee />
        </div>
      </div>
    </div>
  );
}

export default Home;