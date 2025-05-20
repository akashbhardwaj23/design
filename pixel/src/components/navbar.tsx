"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MoveUpRight } from "lucide-react";
import { useRef } from "react";

const listItems = [
  {
    title: "Work",
  },
  {
    title: "About Us",
  },
  {
    title: "Service",
  },
  {
    title: "Contacts",
  },
];

export default function Navbar() {

    const containerRef = useRef<HTMLDivElement | null>(null)
    useGSAP(() => {
        gsap.fromTo(".nav", {
            opacity : 0,
            y : 100,
        } ,{
            opacity : 1,
            y : 0,
            delay : 2,
            duration : 1,
            ease : "power3"
        })
        

    }, [])

  return (
    <nav ref={containerRef} className="relative nav z-20 flex justify-between items-center p-8">
      <div className="flex justify-center gap-1 uppercase">
        <img src="/" alt="" />
        ClimbLab
      </div>
      <div className="flex justify-between gap-4 text-sm w-xs">
        <h2>3:45 PM, UTC+5:30</h2>
        <h2>climblabs@gmail.com</h2>
      </div>
      <div className="flex justify-between gap-2 text-sm w-xs">
        {listItems.map((item) => (
          <h2 key={item.title} className="flex justify-center gap-2 items-center">
            <p className="w-1 h-1 rounded-full bg-foreground"></p>{item.title}
          </h2>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="flex items-center text-red-600 gap-2 uppercase hover:text-red-400 cursor-pointer">Get In Touch <MoveUpRight className="w-4 h-4" /></button>
      </div>
    </nav>
  );
}
