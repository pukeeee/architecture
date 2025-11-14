"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Реєструємо плагін ScrollTrigger для GSAP. Це потрібно робити один раз.
gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "15",
    text: "років на ринку",
    description:
      "Проектуємо та будуємо стильні будинки, втілюючи мрії в реальність.",
  },
  {
    number: "500+",
    text: "індивідуальних проектів",
    description:
      "Кожен проект унікальний, як і його власник. Ми створюємо простір для життя.",
  },
  {
    number: "200+",
    text: "готових рішень",
    description:
      "Авторські проекти, перевірені часом, готові до реалізації вже сьогодні.",
  },
];

export default function Company() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    // Використовуємо gsap.utils.selector для зручного пошуку дочірніх елементів
    const q = gsap.utils.selector(sectionRef);
    const textElements = q(".gsap-company-header, .gsap-company-p");
    const statElements = q(".gsap-company-stat");

    // Створюємо контекст GSAP для безпечного керування анімаціями та їх очищення
    const ctx = gsap.context(() => {
      // Створюємо головну шкалу часу (Timeline), але поки не прив'язуємо до неї ScrollTrigger.
      // Це дозволить нам розділити логіку анімації та "пінінгу".
      const tl = gsap.timeline({});

      // --- ЕТАП 1: Анімація появи елементів ---
      tl.from(textElements, {
        y: 100,
        opacity: 0,
        duration: 1,
      });
      tl.from(
        statElements,
        {
          y: 100,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
        },
        "<0.5",
      );

      // --- ЕТАП 2: Анімація зникнення елементів ---
      tl.to(
        textElements,
        {
          y: -50,
          opacity: 0,
          duration: 1.5,
        },
        ">+1",
      );
      tl.addLabel("fadeOutStart", "-=1");
      tl.to(
        statElements,
        {
          y: -100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
        },
        "fadeOutStart",
      );

      // Створюємо ScrollTrigger для АНІМАЦІЇ.
      // Він відповідає за те, коли анімація почнеться і як вона буде пов'язана зі скролом.
      const animST = ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: tl,
        start: "top 400px", // Анімація починається, коли верх секції за 400px від верху екрана.
        end: "+=200%",
        scrub: 1,
      });

      // Створюємо окремий ScrollTrigger для ПІНІНГУ (закріплення секції).
      // Він відповідає за те, коли секція "прилипне" до екрану.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top 150px", // Пінінг починається, коли верх секції за 150px від верху екрана.
        // Кінець пінінгу має збігатися з кінцем анімації для синхронізації.
        // Ми динамічно отримуємо кінцеву точку з ScrollTrigger'а анімації.
        end: () => animST.end,
      });
    }, sectionRef);

    // Функція очищення, яка видалить всі анімації при розмонтуванні компонента
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className=" dark:bg-neutral-950 pt-20 md:pt-28 overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        <div>
          <h2 className="gsap-company-header text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Створюємо більше, ніж просто будинки
          </h2>
          <p className="gsap-company-p max-w-3xl mx-auto text-lg text-neutral-600 dark:text-neutral-400 mb-16">
            Наша команда рада надати професійну допомогу на всіх етапах. Ми щиро
            хочемо, щоб ваш дім став улюбленим місцем, куди завжди хочеться
            повертатися.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.text}
              className="gsap-company-stat p-8 rounded-xl transition-colors duration-300"
            >
              <p className="text-6xl md:text-7xl font-bold text-amber-500 mb-3">
                {stat.number}
              </p>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                {stat.text}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
