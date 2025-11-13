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

    // Створюємо контекст GSAP для безпечного керування анімаціями та їх очищення
    const ctx = gsap.context(() => {
      const textElements = q(".gsap-company-header, .gsap-company-p");

      // --- Анімація Тексту: Частина 1 - Поява (Reveal) ---
      gsap.from(textElements, {
        // Початковий стан: прозорий і зміщений вниз на 100px
        opacity: 0,
        y: 100,
        // Налаштування ScrollTrigger для появи
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%", // Початок, коли верх секції на 90% висоти екрана
          end: "top 50%", // Кінець, коли верх секції на 50% висоти екрана
          scrub: 1.5, // Плавне слідування за скролом
        },
      });

      // --- Анімація Тексту: Частина 2 - Паралакс ---
      gsap.to(textElements, {
        // Рухаємо текст вгору, поки секція прокручується
        y: -150,
        ease: "none", // Лінійна анімація без згладжування
        // Налаштування ScrollTrigger для паралаксу
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", // Починаємо, де закінчилася анімація появи
          end: "bottom top", // Закінчуємо, коли низ секції досягає верху екрана
          scrub: 1.5,
        },
      });

      // --- Анімація для колонок статистики (залишається без змін) ---
      gsap.from(q(".gsap-company-stat"), {
        // Початковий стан
        opacity: 0,
        y: 100,
        // Послідовна поява елементів
        stagger: 0.2,
        // Налаштування ScrollTrigger
        scrollTrigger: {
          trigger: q(".gsap-company-stat")[0], // Тригер на першому елементі статистики
          start: "top 90%", // Початок, коли верх елемента на 90% висоти екрана
          end: "bottom bottom", // Кінець, коли низ елемента досягає низу екрана
          scrub: 2,
        },
      });
    }, sectionRef);

    // Функція очищення, яка видалить всі анімації при розмонтуванні компонента
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-white dark:bg-neutral-950 py-20 md:py-28 overflow-hidden"
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
              <p className="text-6xl md:text-7xl font-bold text-amber-600 mb-3">
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
