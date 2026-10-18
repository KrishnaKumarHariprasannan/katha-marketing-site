"use client";

import { useEffect, useRef, useState } from "react";

// The About story card: a short intro with a "Read more" toggle for the rest.
export default function AboutCard() {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const collapseTimeoutRef = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current !== null) {
        window.clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <article
      className={`about__card${expanded ? " about__card--expanded" : ""}`}
    >
      <h3 className="about__lead">Katha means “story.” We mean adventure.</h3>

      <div className="about__body" ref={bodyRef}>
        <p>
          Stories aren’t just for bedtime, they shape the way the world views
          your work. They build trust, spark movements, and create action.
        </p>
        <p>
          At Katha, we help organisations that are trying to create an impact -
          from climate change to education, research to social innovation -
          make sure their stories get heard. Through strategy, storytelling,
          and marketing we help organisations turn complex work into narratives
          that inspire action.
        </p>
        <p>
          How do we do this? With a mix of strategy, storytelling, and a touch
          of fun.
        </p>
        <div className="about__extra" aria-hidden={!expanded}>
          <div className="about__extra-inner">
            <p className="about__list-intro">Whether you’re:</p>
            <ul className="about__list">
              <li>a social enterprise launching a bold idea</li>
              <li>a foundation funding change-makers</li>
              <li>a climate startup saving the planet</li>
              <li>or an NGO trying to influence policy</li>
            </ul>
            <p className="about__list-intro">
              we help your story travel further, faster, and with flair.
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`about__toggle${expanded ? " about__toggle--less" : ""}`}
        aria-expanded={expanded}
        onClick={() => {
          if (!expanded) {
            setExpanded(true);
            return;
          }

          bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });

          if (collapseTimeoutRef.current !== null) {
            window.clearTimeout(collapseTimeoutRef.current);
          }

          collapseTimeoutRef.current = window.setTimeout(() => {
            setExpanded(false);
            collapseTimeoutRef.current = null;
          }, 220);
        }}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </article>
  );
}
