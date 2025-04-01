import { useEffect, useRef, useState } from "react";
import { awards } from "./data";
import Lenis from "lenis";
import gsap from "gsap";
import "./styles.css";

const POSITIONS = {
  BOTTOM: 0,
  MIDDLE: -80,
  TOP: -160,
};

const awardImages = {
  0:"https://images.unsplash.com/photo-1612813562440-f3f455f77bf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9kZ2V8ZW58MHx8MHx8fDA%3D",
  1:"https://images.unsplash.com/photo-1609386464913-4cbfa39de540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9kZ2V8ZW58MHx8MHx8fDA%3D",
  2:"https://images.unsplash.com/photo-1520587210458-bd3bee813b97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9kZ2V8ZW58MHx8MHx8fDA%3D",
  3:"https://images.unsplash.com/photo-1609386463693-caf39be25c6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9kZ2V8ZW58MHx8MHx8fDA%3D",
  4:"https://images.unsplash.com/photo-1612814251241-6089fc8fee42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9kZ2V8ZW58MHx8MHx8fDA%3D",
  5:"https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZGdlfGVufDB8fDB8fHww",
  6:"https://images.unsplash.com/photo-1596044021783-8f4b592565ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZGdlfGVufDB8fDB8fHww",
  7:"https://images.unsplash.com/photo-1495582811045-39f82b39c33b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRvZGdlfGVufDB8fDB8fHww",
  8:"https://images.unsplash.com/photo-1610414290892-25e043dbf3a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZGdlfGVufDB8fDB8fHww",


};

const AwardsList = () => {
  const awardsListRef = useRef(null);
  const awardPreviewRef = useRef(null);
  const [activeAward, setActiveAward] = useState(null);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });

    const handleMouseMove = (e) => {
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (e, index, award) => {
    setActiveAward(award);

    const wrapper = e.currentTarget.querySelector(".award-wrapper");
    gsap.to(wrapper, {
      y: POSITIONS.MIDDLE,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    const img = document.createElement("img");
    img.src = awardImages[index] || awardImages[0];
    img.style.position = "absolute";
    img.style.top = 0;
    img.style.left = 0;
    img.style.scale = 0;
    img.style.zIndex = Date.now();

    awardPreviewRef.current.appendChild(img);
    gsap.to(img, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    setActiveAward(null);

    const wrapper = e.currentTarget.querySelector(".award-wrapper");
    const rect = e.currentTarget.getBoundingClientRect();
    const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;
    const newPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;

    gsap.to(wrapper, {
      y: newPosition,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div className="awards-container">
      <div className="awards-list text-xl" ref={awardsListRef}>
        {awards.map((award, index) => (
          <div
            key={index}
            className="award "
            onMouseEnter={(e) => handleMouseEnter(e, index, award)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="award-wrapper">
              <div className="award-name">
                <h1>{award.name}</h1>
                <h1>{award.type}</h1>
               
              </div>
              <div className="award-project">
                <h1>{award.project}</h1>
                <h1>{award.label}</h1>
               
              </div>
              <div className="award-name">
                <h1>{award.name}</h1>
                <h1>{award.type}</h1>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="award-preview" ref={awardPreviewRef}></div>
    </div>
  );
};

export default AwardsList;