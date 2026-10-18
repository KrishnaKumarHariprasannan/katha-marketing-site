import type { Metadata } from "next";
import Image from "next/image";
import AboutStory from "@/components/AboutStory";
import { aboutSections } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Katha is an impact communications studio that helps brands, organisations, and movements say what they mean and say it like they mean it.",
};

// To add a section: add it to lib/about.ts (so it shows in the navbar
// dropdown), then render a <section id={slug}> for it below.
export default function AboutPage() {
  const [story] = aboutSections;

  return (
    <section
      id={story.slug}
      className="services about about-split section--top"
    >
      <Image
        className="about-split__art"
        src="/landing_background_2x.png"
        alt=""
        width={2160}
        height={2160}
        sizes="(max-width: 820px) 80vw, 50vw"
        preload
      />
      <div className="section-inner">
        <div className="about-split__text">
          <header className="services__header">
            <h1 className="services__title">About</h1>
          </header>

          <AboutStory />
        </div>
      </div>
    </section>
  );
}
