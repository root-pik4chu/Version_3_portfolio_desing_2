// import { useRef } from "react";
// import { gsap } from "gsap";

// const HoverBox = () => {
//   const boxRef = useRef(null);
//   const overlayRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const rect = boxRef.current.getBoundingClientRect();
//     const isHoveringTop = e.clientY < rect.top + rect.height / 2;

//     if (overlayRef.current) {
//       overlayRef.current.style.bottom = isHoveringTop ? "auto" : "0";
//       overlayRef.current.style.top = isHoveringTop ? "0" : "auto";
//     }

//     gsap.to(overlayRef.current, {
//       height: "100%",
//       duration: 0.4,
//       ease: "power2.out",
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(overlayRef.current, {
//       height: 0,
//       duration: 0.4,
//       ease: "power2.inOut",
//     });
//   };

//   return (
//     <div
//       ref={boxRef}
//       className="relative w-52 h-24 bg-blue-500 text-white text-lg font-sans flex justify-center items-center overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div
//         ref={overlayRef}
//         className="absolute left-0 w-full h-0 bg-blue-700 z-0"
//       ></div>
//       <span className="relative z-10">Hover Me</span>
//     </div>
//   );
// };

// export default HoverBox;




import { useRef } from "react";
import { gsap } from "gsap";

const HoverBox = ({ text }) => {
  const boxRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = boxRef.current.getBoundingClientRect();
    const isHoveringTop = e.clientY < rect.top + rect.height / 2;

    if (overlayRef.current) {
      overlayRef.current.style.bottom = isHoveringTop ? "auto" : "0";
      overlayRef.current.style.top = isHoveringTop ? "0" : "auto";
    }

    gsap.to(overlayRef.current, {
      height: "100%",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      color: "white",
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      height: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(textRef.current, {
      color: "black",
      duration: 0.2,
    });
  };

  return (
    <div
      ref={boxRef}
      className="relative w-[70%] h-24 border-b border-zinc-400 text-black text-lg font-sans flex flex-col justify-center items-center overflow-hidden p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={overlayRef}
        className="absolute left-0 w-full h-0 bg-orange-600 z-0"
      ></div>
      <span ref={textRef} className="relative z-10">{text}</span>
    </div>
  );
};


export default HoverBox;