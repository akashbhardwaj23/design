"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PixelReveal = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const BLOCKS_X = 50;
  const BLOCKS_Y = 50;

  useEffect(() => {
    const grid = gridRef.current;
    const totalBlocks = BLOCKS_X * BLOCKS_Y;

    // Create grid blocks
    for (let i = 0; i < totalBlocks; i++) {
      const block = document.createElement("div");
      block.className = "block";
      grid?.appendChild(block);
    }

    // Animate blocks away
    gsap.to(".block", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: {
        amount: 2,
        from: "random",
      },
      delay: 0.5,
    });
  }, []);

  return (
    <div className="absolute w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="relative inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image.jpg')" }}
      />

      {/* Pixel Grid Overlay */}
      <div
        ref={gridRef}
        className="relative inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${50}, 1fr)`,
          gridTemplateRows: `repeat(${50}, 1fr)`,
        }}
      ></div>
    </div>
  );
};

export default PixelReveal;
