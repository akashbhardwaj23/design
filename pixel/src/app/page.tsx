"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

export default function Home() {
  const textRef = useRef<HTMLDivElement | null>(null);
  // useGSAP(() => {
  //   const ctx = gsap.context(() => {
  //     let split = SplitText.create(".text", { type: "chars,words,lines" });

  //     gsap.from(".circle", {
  //       width: 0,
  //       height: 0,
  //       delay: 3,
  //       duration: 1,
  //       ease: "power4",
  //     });

  //     gsap.from(split.chars, {
  //       x: 150,
  //       opacity: 0,
  //       duration: 0.7,
  //       ease: "power4",
  //       stagger: 0.04,
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

    useGSAP(() => {
      const ctx = gsap.context(() => {
        const split = new SplitText(textRef.current, {
          type: "lines",
          linesClass: "line",
        });
  
        gsap.set(split.lines, { opacity: 0, yPercent: 100 });
  
        gsap.to(split.lines, {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5,
        });
      }, textRef);
  
      return () => ctx.revert(); // cleanup
    }, []);


  return (
    <div className="flex flex-col p-20 gap-8">
      <section ref={textRef} className="text container w-xl text-7xl">
        <div className="flex items-center space-x-3 px-12">
          <p className="w-5 h-5 circle rounded-full bg-foreground"></p>
          <h1>Grow Beyond</h1>
        </div>
        <h1>the Algorithm</h1>
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-sm w-72">
          Cuting-edge SEO strategies with data-driven marketing to boost your
          visibilty
        </h2>

        <p className="text-red-500">[Leave A Request]</p>
      </section>
    </div>
  );
}
