import type { Metadata } from "next";
import AboutCard from "@/components/AboutCard";
import { aboutSections } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: "Katha means “story.” We mean adventure.",
};

// To add a section: add it to lib/about.ts (so it shows in the navbar
// dropdown), then render a <section id={slug}> for it below.
export default function AboutPage() {
  const [story] = aboutSections;

  return (
    <section id={story.slug} className="services about section--top">
      <div className="section-inner">
        <header className="services__header">
          <h1 className="services__title">About</h1>
        </header>

        <div className="about__content">
          <AboutCard />
        </div>
      </div>
    </section>
  );
}
