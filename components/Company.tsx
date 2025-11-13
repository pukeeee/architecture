"use client";

import { useInView, useAnimate, stagger } from "motion/react";
import { useEffect } from "react";

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

const hiddenState = { opacity: 0, y: 50 };

export default function Company() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      animate(
        ".anim-item",
        { opacity: 1, y: 0 },
        { duration: 1, delay: stagger(0.5), ease: "easeOut" },
      );
    }
  }, [isInView, animate]);

  return (
    <section
      ref={scope}
      id="about"
      className="bg-white dark:bg-neutral-950 py-20 md:py-32"
    >
      <div className="container mx-auto px-4 text-center">
        <div>
          <h2
            style={hiddenState}
            className="anim-item text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6"
          >
            Створюємо більше, ніж просто будинки
          </h2>
          <p
            style={hiddenState}
            className="anim-item max-w-3xl mx-auto text-lg text-neutral-600 dark:text-neutral-400 mb-16"
          >
            Наша команда рада надати професійну допомогу на всіх етапах. Ми щиро
            хочемо, щоб ваш дім став улюбленим місцем, куди завжди хочеться
            повертатися.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.text}
              style={hiddenState}
              className="anim-item p-8 rounded-xl transition-colors duration-300"
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
