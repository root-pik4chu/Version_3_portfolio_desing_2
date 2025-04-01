// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import AwardsSection from './AwardsSection'
// import HoverBox from './HoverBox'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home';
// import About from './Pages/About'
// import Layout from './Layout'

// function App() {
//   const [count, setCount] = useState(0)

//   const items = [
//     "Text 1", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6", "Text 7", "Text 8"
//   ];

//   return (
//     <>
//       {/* <AwardsSection /> */}
     
//       {/* <div className="w-full h-[50vh] relative flex items-center justify-center flex-col">
//       {items.map((text, index) => (
//         <HoverBox key={index} text={text} />
//       ))}
//       </div> */}


// <div className="font-[f1] bg-zinc-50 ">
// <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
        
//         </Route>
//       </Routes>
//     </BrowserRouter>

// </div>

//     </>
//   )
// }

// export default App










import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AwardsSection from './AwardsSection';
import HoverBox from './HoverBox';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Layout from './Layout';
import Lenis from '@studio-freight/lenis';

function App() {
  const [count, setCount] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.09, // Adjust smoothness
      direction: "vertical",
      gestureDirection: "vertical",
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  const items = [
    "Text 1", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6", "Text 7", "Text 8"
  ];

  return (
    <>
      {/* <AwardsSection /> */}
     
      {/* <div className="w-full h-[50vh] relative flex items-center justify-center flex-col">
        {items.map((text, index) => (
          <HoverBox key={index} text={text} />
        ))}
      </div> */}

      <div className="font-[f1] bg-zinc-50">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;





