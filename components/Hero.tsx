"use client";

// Імпортуємо Swiper та його компоненти
import { Swiper, SwiperSlide } from "swiper/react";
// Імпортуємо необхідні модулі Swiper для навігації, ефектів та автопрокрутки
import { Navigation, EffectCreative, Autoplay } from "swiper/modules";

// Імпортуємо базові стилі Swiper та стилі для модулів
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

import Image from "next/image";

// Масив зображень для каруселі для зручного масштабування
const heroImages = [
  { src: "/tmv-hero-1.webp", alt: "Екстер'єр сучасного будинку" },
  { src: "/tmv-hero-2.webp", alt: "Інтер'єр сучасного будинку" },
];

/**
 * Компонент Hero, реалізований як карусель за допомогою Swiper.js.
 * Надає можливість ручного перемикання слайдів за допомогою стрілок,
 * а також має ефект плавного переходу та автопрокрутку.
 */
export default function Hero() {
  return (
    <section className="relative h-screen w-full">
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
    </section>
  );
}
