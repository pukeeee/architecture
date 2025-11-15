"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const categoriesContent = [
  {
    title: "Будівництво під ключ",
    description:
      "Ми пропонуємо повний комплекс послуг з будівництва заміських будинків під ключ у Києві та Київській області. Обираючи нас, ви позбавляєте себе від клопоту та додаткових витрат.",
    image: "/tmv-hero-1.webp",
  },
  {
    title: "Індивідуальне проектування",
    description:
      "Наша команда досвідчених архітекторів працює у тісній співпраці з Замовниками, щоб створити унікальну та кардинально нову будівлю з комфортним простором для вас.",
    image: "/tmv-hero-2.webp",
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const block1 = section.querySelector<HTMLDivElement>(".category-block-1");
      const image1 = block1?.querySelector(".category-image");
      const text1 = block1?.querySelector(".category-text");

      const block2 = section.querySelector<HTMLDivElement>(".category-block-2");
      const image2 = block2?.querySelector(".category-image");
      const text2 = block2?.querySelector(".category-text");

      if (!block1 || !block2 || !image1 || !text1 || !image2 || !text2) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "top 80%", // Анімація починається, коли верх секції на 80% екрану
          end: () => "+=" + window.innerHeight, // Зменшено час піна
        },
      });

      // Анімація
      tl
        // 1. Поява першого блоку
        .from(image1, {
          xPercent: -100,
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
        })
        .from(
          text1,
          { xPercent: 100, autoAlpha: 0, duration: 1, ease: "power2.out" },
          "<",
        )

        // Пауза, щоб перший блок був повністю видимий
        .to({}, { duration: 0.5 })

        // 2. Поява другого блоку
        .from(
          image2,
          { xPercent: 100, autoAlpha: 0, duration: 1, ease: "power2.out" },
          ">",
        )
        .from(
          text2,
          { xPercent: -100, autoAlpha: 0, duration: 1, ease: "power2.out" },
          "<",
        )

        // 3. Фінальна пауза
        .to({}, { duration: 0.5 });

      // Окремий ScrollTrigger для пінінгу
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top", // Пінінг починається зверху екрану
        end: () => "+=" + window.innerHeight, // Зменшено час піна
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="h-screen w-full bg-background text-foreground overflow-x-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col gap-10 pt-32">
        {/* Блок 1 */}
        <div className="category-block-1 pt-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 rounded-lg overflow-hidden category-image">
              <div
                className="absolute inset-0 bg-gray-300 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${categoriesContent[0].image})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold text-white">
                  {categoriesContent[0].title}
                </h3>
              </div>
            </div>
            <div className="category-text">
              <h2 className="text-xl font-bold mb-3">
                {categoriesContent[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {categoriesContent[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* Блок 2 (Текст зліва, картинка справа) */}
        <div className="category-block-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="category-text text-left">
              <h2 className="text-xl font-bold mb-3">
                {categoriesContent[1].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {categoriesContent[1].description}
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden category-image">
              <div
                className="absolute inset-0 bg-gray-300 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${categoriesContent[1].image})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-6 right-6 text-right">
                <h3 className="text-xl font-bold text-white">
                  {categoriesContent[1].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
