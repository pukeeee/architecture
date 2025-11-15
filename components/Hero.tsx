"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  { src: "/tmv-hero-1.webp", alt: "Екстер'єр сучасного будинку" },
  { src: "/tmv-hero-2.webp", alt: "Інтер'єр сучасного будинку" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  useGSAP(
    () => {
      // Створюємо таймлайн для анімації, пов'язаної зі скролом.
      // Таймлайн дозволяє послідовно керувати кількома анімаціями.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // Елемент, який відстежується для запуску анімації.
          start: "top top", // Анімація починається, коли верхня частина тригера досягає верхньої частини екрану.
          end: "bottom top", // Анімація закінчується, коли нижня частина тригера досягає верхньої частини екрану.
          scrub: true, // Анімація плавно "прив'язується" до прогресу прокрутки. `true` створює м'який ефект.
        },
      });

      // Додаємо анімацію до таймлайну.
      // При прокручуванні вниз, слайдер буде зменшуватися та ставати майже прозорим.
      tl.to(swiperRef.current, {
        scale: 0.6, // Кінцевий масштаб елемента (70% від початкового розміру).
        opacity: 0.1, // Кінцева прозорість (10%).
        ease: "power1.inOut", // Функція плавності для м'якого початку та кінця анімації.
      });

      // Початкова анімація появи слайдера при завантаженні сторінки.
      // `autoAlpha` анімує одночасно `opacity` та `visibility`,
      // що є кращим для продуктивності, ніж просто `opacity`.
      gsap.from(swiperRef.current, {
        autoAlpha: 0, // Початковий стан: повністю прозорий та невидимий.
        duration: 1.5, // Тривалість анімації в секундах.
        ease: "power2.out", // Функція плавності, що створює ефект уповільнення в кінці.
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        ref={swiperRef}
        className="h-full w-full"
        style={{ visibility: "hidden" }}
      >
        <Swiper
          modules={[Navigation, EffectCreative, Autoplay]}
          navigation
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          speed={1500}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          className="h-full w-full"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                quality={90}
                priority={index === 0}
              />
              <div className="absolute inset-0 flex items-center justify-center" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 z-10 pointer-events-none" />
      </div>
    </section>
  );
}
