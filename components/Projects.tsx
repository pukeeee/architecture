"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Home, Maximize, DollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "Villa Moderne",
    category: "Сучасний",
    area: "320 м²",
    price: "від $450,000",
    image: "/tmv-hero-2.webp",
    featured: true,
    description: "Розкішна вілла з панорамним склінням",
  },
  {
    id: 2,
    name: "Forest House",
    category: "Екологічний",
    area: "180 м²",
    price: "від $280,000",
    image: "/tmv-hero-1.webp",
    featured: false,
    description: "Гармонія з природою",
  },
  {
    id: 3,
    name: "Urban Loft",
    category: "Компактний",
    area: "145 м²",
    price: "від $190,000",
    image: "/tmv-hero-2.webp",
    featured: false,
    description: "Розумне використання простору",
  },
  {
    id: 4,
    name: "Classic Manor",
    category: "Класичний",
    area: "420 м²",
    price: "від $580,000",
    image: "/tmv-hero-1.webp",
    featured: true,
    description: "Елегантність поза часом",
  },
  {
    id: 5,
    name: "Minimalist Cube",
    category: "Сучасний",
    area: "210 м²",
    price: "від $320,000",
    image: "/tmv-hero-2.webp",
    featured: false,
    description: "Чисті лінії та функціональність",
  },
  {
    id: 6,
    name: "Green Valley",
    category: "Екологічний",
    area: "260 м²",
    price: "від $380,000",
    image: "/tmv-hero-1.webp",
    featured: false,
    description: "Енергоефективність та комфорт",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useGSAP(
    () => {
      // Анімація заголовка
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Staggered анімація карточок з різною затримкою
      gsap.from(cardsRef.current, {
        y: 150,
        opacity: 0,
        scale: 0.9,
        stagger: 0.12,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="projects" className="py-32 overflow-hidden">
      <div className="container mx-auto px-4 ">
        {/* Заголовок */}
        <div ref={titleRef} className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-100">
            Наші проекти
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Кожен проект — це унікальне поєднання естетики, функціональності та
            вашого комфорту
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12 ">
          {projects.map((project, index) => {
            // Різні розміри для Bento-grid ефекту
            const getGridClass = () => {
              if (project.featured) {
                return "md:col-span-3 md:row-span-2 h-[500px]";
              }
              return "md:col-span-2 h-[320px]";
            };

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                ref={(el) => {
                  // cardsRef.current[index] = el;
                }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getGridClass()}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Зображення */}
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Градієнтний оверлей */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/60" />

                {/* Основний контент (завжди видимий) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-sm text-primary mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-neutral-300 mb-4 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {project.description}
                  </p>
                </div>

                {/* Додаткова інформація (з'являється при hover збоку) */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black/95 backdrop-blur-sm p-6 rounded-l-2xl border-l-2 border-primary/40 transform transition-all duration-500 ${
                    hoveredId === project.id
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-4 min-w-[200px]">
                    <div className="flex items-center gap-3 text-neutral-200">
                      <Maximize className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-neutral-400">Площа</p>
                        <p className="font-semibold">{project.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-200">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-neutral-400">Вартість</p>
                        <p className="font-semibold">{project.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium mt-2">
                      Детальніше
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover border ефект */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-500 group-hover:border-primary/40" />

                {/* Іконка в правому верхньому куті */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/30 transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
                  <Home className="w-5 h-5 text-primary group-hover:text-black" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Кнопка всіх проектів */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary/10 border-2 border-primary/30 rounded-full text-lg font-medium text-primary hover:bg-primary hover:text-black transition-all duration-300"
          >
            Всі проекти
            <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
