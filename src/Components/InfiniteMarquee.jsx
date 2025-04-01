import { useEffect, useRef, useState } from 'react';

function InfiniteMarquee() {
  const sliderRef = useRef(null);
  const imagesRef = useRef([]);
  const [imageWidth, setImageWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [unsplashImages, setUnsplashImages] = useState([]);
  
  // Settings matching the original
  const ease = 0.04;
  const imageParallaxFactor = 70;
  const imageStepMultiplier = 0.7;
  
  // Fetch Unsplash images
  useEffect(() => {
    // Using a specific collection for consistency
    const unsplashUrls = [
      'https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D', // Nature
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // City
      'https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D', // Nature
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D', // Nature
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D', 
      'https://images.unsplash.com/photo-1726455083595-fb3d23fa3d2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D',// Nature
 
      
    ];
    
    setUnsplashImages(unsplashUrls);
  }, []);
  
  // Track when all images are loaded
  useEffect(() => {
    if (unsplashImages.length === 0) return;
    
    // Reset loaded state when URLs change
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
      img.onerror = (err) => {
        console.error('Failed to load image:', url, err);
        loadedCount++; // Still count failed images to avoid blocking
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, [unsplashImages]);
  
  // Initialize sizes once DOM and images are ready
  useEffect(() => {
    if (!imagesLoaded || !sliderRef.current) return;
    
    const init = () => {
      if (sliderRef.current) {
        const newSliderWidth = sliderRef.current.getBoundingClientRect().width;
        setSliderWidth(newSliderWidth);
        
        const newImageWidth = newSliderWidth / unsplashImages.length;
        setImageWidth(newImageWidth);
        
        // Set document height to create scrollbar
        document.body.style.height = `${newSliderWidth - (window.innerWidth - window.innerHeight)}px`;
        
        setIsInitialized(true);
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      init();
    });
    
    window.addEventListener('resize', init);
    
    return () => {
      window.removeEventListener('resize', init);
    };
  }, [imagesLoaded, unsplashImages.length]);
  
  // Setup the animation only when everything is ready
  useEffect(() => {
    if (!isInitialized || !imagesLoaded || !sliderRef.current || imageWidth === 0) return;
    
    let current = 0;
    let target = 0;
    let rafId = null;
    
    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t;
    };
    
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
          let intersectionRatioValue = ratio - (index * imageStepMultiplier);
          intersectionRatioValue = Math.max(-10.5, Math.min(10.5, intersectionRatioValue));
          image.style.transform = `translateX(${intersectionRatioValue * imageParallaxFactor}px)`;
        }
      });
    };
    
    // Start animation
    rafId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isInitialized, imagesLoaded, imageWidth, unsplashImages.length]);
  
  return (
    <main>
      <div className="slider" ref={sliderRef}>
        <div className="slider_inner">
          {unsplashImages.map((imageUrl, index) => (

            <div className="">
               <div className="hii w-full h-[10vh] ">
                  <h1 className='font-semibold mb-[2vw]'>project Heading</h1>
                  <p className='text-sm'>explaination about these projec in mini way</p>
               
               </div>
               <div className="item" key={index}>
              <div 
                className="img"
                ref={(el) => (imagesRef.current[index] = el)}
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
            </div>
            </div>
          ))}
        </div>
      </div>
      {!imagesLoaded && (
        <div style={{ position: 'fixed', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Loading images...
        </div>
      )}
    </main>
  );
}

export default InfiniteMarquee;