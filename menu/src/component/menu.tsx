"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/lab", label: "Lab" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

export function Menu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", {
        y: 75,
      });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-over", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: menuRef }
  );

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMenuOpen]);

  return (
    <div className="menu" ref={menuRef}>
      <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-1 text-foreground text-xl">
        <div className="toggle">
          <Link href={"/"} className="cursor-pointer">
            Home
          </Link>
        </div>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <p className="cursor-pointer">Menu</p>
        </div>
      </div>
      <div className="menu-over fixed top-0 left-0 w-full h-screen p-8 flex flex-col justify-between items-center z-2 text-background text-xl bg-[#c5fb45]">
        <div className="menu-overlay-bar flex w-full justify-between font-medium">
          <div className="menu-logo">
            <Link href={"/"}>Home</Link>
          </div>
          <div
            className="menu-close flex gap-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <p>Close</p>
          </div>
        </div>

        <div className="menu-copy h-full w-full flex flex-col justify-between p-8">
          <div className="menu-links flex flex-col max-w-xl items-center">
            {menuLinks.map((menu, index) => (
              <div key={index} className="menu-link-item w-max">
                <div
                  className="menu-link-item-holder relative text-7xl"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Link href={menu.path} className="">
                    {menu.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end h-full w-full">
            <div className="flex-2 flex cursor-pointer">
              <p className="text-7xl">&#x2715;</p>
            </div>
            <div className="flex flex-3 flex-col text-lg font-medium">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Dribble &#8599;</a>
            </div>
            <div className="flex-4 text-lg font-medium">
              <p>akash@gmail.com</p>
              <p>09638387898</p>
            </div>
            <div className="flex-4 flex justify-end items-end w-full">
              <p className="text-xl">View ShowReel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
