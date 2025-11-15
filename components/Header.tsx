"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Categories", href: "#categories" },
  { name: "Projects", href: "#projects" },
  { name: "Contacts", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const headerBackgroundRef = useRef(null);

  useGSAP(
    () => {
      // Початкова анімація появи хедера
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Анімація фону при скролі
      gsap.to(headerBackgroundRef.current, {
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(17, 24, 39, 0.3)",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "body",
          start: "100px top",
          end: "250px top",
          scrub: true,
        },
      });

      // Анімація посилань при наведенні
      const links = gsap.utils.toArray<HTMLElement>(".nav-link-gsap");
      links.forEach((link) => {
        const topLayer = link.children[0] as HTMLElement;
        const timeline = gsap.timeline({ paused: true });

        gsap.set(topLayer, { width: "100%" });

        timeline
          .to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" }, 0)
          .to(
            topLayer,
            { width: "0%", duration: 0.4, ease: "power3.inOut" },
            0,
          );

        link.addEventListener("mouseenter", () => timeline.play());
        link.addEventListener("mouseleave", () => timeline.reverse());
      });
    },
    { scope: headerRef },
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: href, offsetY: 70 },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div
        ref={headerBackgroundRef}
        className="w-full"
        style={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(17, 24, 39, 0)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-30 items-center justify-between">
            <div className="shrink-0">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <Image
                  src="/TMV_LOGO_WW-04.webp"
                  alt="TMV Logo"
                  width={80}
                  height={32}
                  priority
                />
              </Link>
            </div>
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleScroll}
                  className="nav-link-gsap relative text-2xl font-medium text-primary"
                >
                  <span className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap">
                    {link.name}
                  </span>
                  {link.name}
                </Link>
              ))}
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
