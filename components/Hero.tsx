"use client";

// Імпорти React хуків для роботи з DOM-елементами та життєвим циклом компонента
import { useRef, useLayoutEffect } from "react";
// Імпортуємо Swiper та його компоненти
import { Swiper, SwiperSlide } from "swiper/react";
// Імпортуємо необхідні модулі Swiper для навігації, ефектів та автопрокрутки
import { Navigation, EffectCreative, Autoplay } from "swiper/modules";
// Імпортуємо бібліотеку анімацій GSAP та її плагін ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Імпортуємо motion для декларативних анімацій
import { motion } from "motion/react";

// Імпортуємо базові стилі Swiper та стилі для модулів
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

import Image from "next/image";

// Реєструємо плагін ScrollTrigger для GSAP
gsap.registerPlugin(ScrollTrigger);

// Масив зображень для каруселі для зручного масштабування
const heroImages = [
  { src: "/tmv-hero-1.webp", alt: "Екстер'єр сучасного будинку" },
  { src: "/tmv-hero-2.webp", alt: "Інтер'єр сучасного будинку" },
];

/**
 * Компонент Hero, реалізований як карусель за допомогою Swiper.js.
 * Має анімацію появи та ефект віддалення (parallax) при скролі.
 * Надає можливість ручного перемикання слайдів за допомогою стрілок,
 * а також має ефект плавного переходу та автопрокрутку.
 */
export default function Hero() {
  // Створюємо ref для всієї секції, щоб використовувати її як тригер для анімації
  const sectionRef = useRef(null);
  // Створюємо ref для контейнера Swiper, який будемо анімувати
  const swiperRef = useRef(null);

  // Використовуємо useLayoutEffect для безпечної роботи з DOM-елементами на клієнті
  useLayoutEffect(() => {
    // Створюємо контекст GSAP для керування анімаціями
    const ctx = gsap.context(() => {
      // Створюємо анімацію, яка реагує на скрол
      gsap.to(swiperRef.current, {
        // Вказуємо, що анімація буде керована ScrollTrigger
        scrollTrigger: {
          trigger: sectionRef.current, // Елемент, який активує анімацію
          start: "top top", // Початок анімації, коли верх тригера досягає верху екрана
          end: "bottom top", // Кінець, коли низ тригера досягає верху екрана
          scrub: true, // Плавне "прив'язування" анімації до прогресу скролу
        },
        scale: 0.8, // Зменшуємо масштаб до 80%
        ease: "none", // Лінійна функція пом'якшення для плавності
      });
    }, sectionRef); // Прив'язуємо контекст до головного елемента

    // Функція очищення, яка виконається при розмонтуванні компонента
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/*
        Контейнер для анімацій.
        `motion` використовується для анімації появи.
        `ref` використовується для GSAP анімації скролу.
      */}
      <motion.div
        ref={swiperRef}
        className="h-full w-full"
        initial={{ opacity: 0 }} // Початковий стан: повністю прозорий
        animate={{ opacity: 1 }} // Кінцевий стан: повністю видимий
        transition={{ duration: 1.5, ease: "easeOut" }} // Налаштування переходу
      >
        <Swiper
          // Підключаємо модулі, які будемо використовувати
          modules={[Navigation, EffectCreative, Autoplay]}
          // Вмикаємо навігаційні стрілки
          navigation
          // Встановлюємо креативний ефект
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
          // Встановлюємо швидкість переходу в 1500 мс (1.5 секунди)
          speed={1500}
          // Робимо карусель нескінченною
          loop={true}
          // Налаштовуємо автопрокрутку
          autoplay={{
            delay: 5000, // Затримка 5 секунд
            disableOnInteraction: true, // Вимикати автопрокрутку після ручного перемикання
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
                priority={index === 0} // Пріоритетне завантаження тільки для першого слайду
              />
              {/*
              Контейнер для майбутнього текстового контенту.
              Кожен слайд може мати свій унікальний опис.
            */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <h1 className="text-white text-4xl font-bold">Текст для слайду {index + 1}</h1> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/*
        Напівпрозорий шар поверх каруселі для кращої читабельності контенту.
        z-10 гарантує, що він буде над зображеннями, але під стрілками навігації.
        pointer-events-none дозволяє клікам "проходити" крізь нього до стрілок.
      */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
      </motion.div>
    </section>
  );
}
