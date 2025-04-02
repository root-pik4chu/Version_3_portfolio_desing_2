
import React from "react";
import InfinityScroller from "../Components/infinityScroller/infinityScroller";
// import InfinityScrollerWithParallax from "../Components/infinityScroller/infinityScrollerWithParallax";


function About() {
   return (
     <div className="">
       
       <InfinityScroller                               
              direction={1}
              bgColor="--highlighter"
              text="--text_white"
            />
             <InfinityScroller
              direction={0}
              bgColor="--bgColor"
              text="--text_color"
            />
            {/* <InfinityScrollerWithParallax /> */}
     </div>
   );
 }
 
 export default About;


 