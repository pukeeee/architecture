import Hero from "@/components/Hero";
import Company from "@/components/Company";
import Categories from "@/components/Categories";
import Projects from "@/components/Projects";
import Feedback from "@/components/Feedback";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-orange-50">
      <Hero />
      <Company />
      <Categories />
      <Projects />
      <Feedback />
      <Contact />
    </div>
  );
}
