"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

export default function PixelComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  gsap.registerPlugin(SplitText);
  useGSAP(() => {
    const pixels = Array.from(
      containerRef.current?.querySelectorAll(".pixel") || []
    );
    let split = SplitText.create(".text", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
    });

    // Group pixels manually (adjust size per container)
    const rows = groupPixelsByRow(pixels, 10); // Assuming 10 columns in bottom-most container

    // Animate bottom to top
    rows.reverse().forEach((row, rowIndex) => {
      const shuffled = shuffleArray(row);
      const selected = shuffled.filter(() => Math.random() > 0.4);

      gsap.to(selected, {
        backgroundColor: () => {
          const g = randomGray(); // R = G = B
          return `rgb(${g}, ${g}, ${g})`;
        },
        ease: "power2.out",
        stagger: {
          amount: 2,
          from: "end",
        },
        delay: 0.5,
        onComplete: () => {
          // Step 2: After reveal, turn everything to solid black
          gsap.to(selected, {
            backgroundColor: "black",
            duration: 0.6,
          }),
            gsap.fromTo(split.words,{
                yPercent : 100,
                opacity : 0
            }, {
                delay : 1,
                duration: 0.6,
                yPercent: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "expo.out",
            });
        },
      });
    });

    // gsap.to(".pixel", {
    //     backgroundColor: () => {
    //         const g = randomGray(); // R = G = B
    //     return `rgb(${g}, ${g}, ${g})`;
    //     },
    //   ease: "power2.out",
    //   stagger: {
    //     amount: 2,
    //     from: "end",
    //   },
    //   delay : 0.5,
    //   onComplete: () => {
    //     // Step 2: After reveal, turn everything to solid black
    //     gsap.to(".pixel", {
    //       backgroundColor: 'black',
    //       duration: 0.6,
    //     })}
    // })
  }, {
    scope :containerRef
  });

  const randomGray = () => {
    const g = Math.floor(Math.random() * 50) + 30; // gives 30–80
    return g;
  };

  const groupPixelsByRow = (pixels: Element[], rowSize: number) => {
    const rows: Element[][] = [];
    for (let i = 0; i < pixels.length; i += rowSize) {
      rows.push(pixels.slice(i, i + rowSize));
    }
    return rows;
  };

  // Shuffle helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  return (
    <div
      className="background w-full h-screen bg-transparent absolute overflow-hidden"
      ref={containerRef}
    >
      <div className="relative pixel-container grid grid-cols-2 h-20 w-28 left-[45%]">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div key={index} className="pixel"></div>
          ))}
      </div>
      <div className="relative pixel-container grid grid-cols-4  h-16 w-28 left-1/2 top-20">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <div key={index} className="pixel"></div>
          ))}
      </div>
      <div className="relative pixel-container grid grid-cols-15 h-48 w-xl left-1/2 top-20">
        {Array(50)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="pixel border border-background"></div>
          ))}
      </div>
      <div className="relative pixel-container grid grid-cols-3 items-end h-72 w-full bottom-[-6.6rem]">
        <div className="col-span-1 grid grid-cols-15 h-52 w-full">
          {Array(75)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="pixel border border-white"></div>
            ))}
        </div>
        <div className="relative combine rounded-xl col-span-2 grid grid-cols-25 h-full w-full">
          {Array(150)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="pixel border border-white">
                
              </div>
            ))}

          <div className="slice absolute flex justify-center items-center right-0 h-full w-1/2 text-background rounded-l-xl z-10">
          <div className="text text-sm w-64 hidden">
              We combine deep SEO expertise, smart strategy, and data-driven
              insight to help you
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
