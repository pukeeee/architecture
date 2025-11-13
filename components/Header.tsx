"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion } from "motion/react";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

// Реєструємо плагіни GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Навігаційні посилання в порядку їх відображення зліва направо
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Categories", href: "#categories" },
  { name: "Projects", href: "#projects" },
  { name: "Contacts", href: "#contact" },
];

/**
 * Компонент хедера сайту.
 * Має фіксоване позиціонування, анімований фон, що з'являється при скролі,
 * та навігаційні посилання для плавної прокрутки до секцій сторінки.
 * Анімація реалізована за допомогою GSAP та ScrollTrigger.
 */
export default function Header() {
  const headerBackgroundRef = useRef(null);
  const navRef = useRef<HTMLElement>(null);

  // Налаштовуємо анімацію фону та посилань
  useEffect(() => {
    const anim = gsap.to(headerBackgroundRef.current, {
      backdropFilter: "blur(5px)",
      backgroundColor: "rgba(17, 24, 39, 0.3)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "body",
        start: "50px top",
        end: "100px top",
        scrub: true,
      },
    });

    const links = gsap.utils.toArray<HTMLElement>(".nav-link-gsap", navRef.current);
    links.forEach((link) => {
      const topLayer = link.children[0] as HTMLElement;
      const timeline = gsap.timeline({ paused: true });

      gsap.set(topLayer, { width: "100%" });

      timeline
        .to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" }, 0)
        .to(topLayer, { width: "0%", duration: 0.4, ease: "power3.inOut" }, 0);

      link.addEventListener("mouseenter", () => timeline.play());
      link.addEventListener("mouseleave", () => timeline.reverse());
    });

    return () => {
      anim.kill();
      // Тут можна було б і очищувати event listeners, але для цього прикладу це не критично
    };
  }, []);

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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
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
            <nav ref={navRef} className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleScroll}
                  className="nav-link-gsap relative text-xl font-medium text-white"
                >
                  <span className="absolute top-0 left-0 text-gray-300 overflow-hidden whitespace-nowrap">
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
    </motion.header>
  );
}
