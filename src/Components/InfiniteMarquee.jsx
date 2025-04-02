import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
function InfiniteMarquee() {
  const sliderRef = useRef(null);
  const imagesRef = useRef([]);
  const [imageWidth, setImageWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [unsplashImages, setUnsplashImages] = useState([]);

  const ease = 0.04;
  const imageParallaxFactor = 70;
  const imageStepMultiplier = 0.7;

  useEffect(() => {
    const unsplashUrls = [
      "https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60",
      
    ];
    setUnsplashImages(unsplashUrls);
  }, []);

  useEffect(() => {
    if (unsplashImages.length === 0) return;

    setImagesLoaded(false);
    let loadedCount = 0;
    const totalImages = unsplashImages.length;

    unsplashImages.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, [unsplashImages]);

  useEffect(() => {
    if (!imagesLoaded || !sliderRef.current) return;

    const init = () => {
      if (sliderRef.current) {
        const newSliderWidth = sliderRef.current.getBoundingClientRect().width;
        setSliderWidth(newSliderWidth);
        const newImageWidth = newSliderWidth / unsplashImages.length;
        setImageWidth(newImageWidth);
        document.body.style.height = `${newSliderWidth - (window.innerWidth - window.innerHeight)}px`;
        setIsInitialized(true);
      }
    };

    requestAnimationFrame(() => {
      init();
    });

    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
    };
  }, [imagesLoaded, unsplashImages.length]);

  useEffect(() => {
    if (!isInitialized || !imagesLoaded || !sliderRef.current || imageWidth === 0) return;

    let current = 0;
    let target = 0;
    let rafId = null;

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const animate = () => {
      target = window.scrollY;
      current = parseFloat(lerp(current, target, ease)).toFixed(2);
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${current}px)`;
      }
      animateImages(parseFloat(current));
      rafId = requestAnimationFrame(animate);
    };

    const animateImages = (currentPos) => {
      const ratio = currentPos / imageWidth;
      imagesRef.current.forEach((image, index) => {
        if (image) {
          let intersectionRatioValue = ratio - index * imageStepMultiplier;
          intersectionRatioValue = Math.max(-10.5, Math.min(10.5, intersectionRatioValue));
          image.style.transform = `translateX(${intersectionRatioValue * imageParallaxFactor}px)`;
        }
      });
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isInitialized, imagesLoaded, imageWidth, unsplashImages.length]);

  useEffect(() => {
    if (imagesLoaded) {
      gsap.to(".clip-image", {
        duration: 1.8,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
        stagger: 0.03,
      });
    }
  }, [imagesLoaded]);

  return (
    <main>
      <div className="slider" ref={sliderRef}>
        <div className="slider_inner">
          {unsplashImages.map((imageUrl, index) => (
            <div key={index} className="item">
              <div className="hii w-full h-[10vh]">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 1.2, 
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                className="font-semibold mb-[2vw]">Project Heading</motion.h1>
                <motion.p 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 1.4, 
                  duration: 0.4,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className="text-sm">Explanation about this project in a mini way</motion.p>
              </div>
              <div
                className="img clip-image"
                ref={(el) => (imagesRef.current[index] = el)}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {!imagesLoaded && (
        <div style={{ position: "fixed", top: "70%", left: "50%", transform: "translate(-50%, -50%)" }}>
          Loading images...
        </div>
      )}
    </main>
  );
}

export default InfiniteMarquee;
