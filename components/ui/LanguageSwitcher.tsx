"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { motion, Variants } from "motion/react";

/**
 * Варіанти анімації для контейнера елементів меню.
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

/**
 * Варіанти анімації для кожного елемента меню.
 */
const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

/**
 * Варіанти анімації для обгортки кнопки (бордюр).
 */
const buttonWrapperVariants: Variants = {
  initial: {
    borderColor: "transparent",
    borderWidth: "1px",
  },
  hover: {
    borderColor: "#C7A17A", // Акцентний колір з палітри
    borderWidth: "1px",
    transition: { duration: 0.3 },
  },
};

/**
 * Варіанти анімації для іконки глобуса (обертання).
 */
const globeVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: 45, transition: { type: "spring", stiffness: 300 } },
};

/**
 * Компонент для перемикання мови сайту.
 */
export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("EN");
  const languages = ["EN", "UA"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          variants={buttonWrapperVariants}
          initial="initial"
          whileHover="hover"
          className="rounded-md"
        >
          <Button
            variant="ghost"
            className="min-w-24 text-lg font-medium text-white hover:text-amber-500 transition-colors duration-300 flex items-center justify-center hover:bg-transparent border border-transparent"
          >
            <motion.div variants={globeVariants}>
              <Globe className="h-5 w-5" />
            </motion.div>
            {currentLang}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-auto min-w-20 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border-gray-200/50"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang}
              onSelect={() => setCurrentLang(lang)}
              className="justify-center cursor-pointer w-full focus:bg-gray-100/50"
              disabled={lang === currentLang}
            >
              <motion.div variants={itemVariants} className="py-1">
                {lang}
              </motion.div>
            </DropdownMenuItem>
          ))}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
